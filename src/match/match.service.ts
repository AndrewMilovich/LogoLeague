import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { PaginationDto } from './dto/pagination-dto';
import { GetSummonerByNameDto } from '../summoner/dto/get-summoner-by-name-dto';
import { SummonerService } from '../summoner/summoner.service';
import { getRegionTypeByValue, getSummonerInfoFromMatch } from '../utils/app';
import { multithreading } from '../utils/multithreading';
import { MatchResponse, Participant } from '../types/matchResponse';
import { Match as MatchEntity } from './entities/match.entity';
import { Summoner as SummonerEntity } from '../summoner/entities/summoner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {
  constructor(
    private readonly httpService: HttpService,
    private readonly summonerService: SummonerService,
    @InjectRepository(MatchEntity)
    private matchRepository: Repository<MatchEntity>,
    @InjectRepository(SummonerEntity)
    private summonerRepository: Repository<SummonerEntity>,
  ) {}

  async getRecentSummonerMatches(
    { name, region }: GetSummonerByNameDto,
    pagination: PaginationDto,
  ): Promise<MatchEntity[]> {
    try {
      const summoner = await this.summonerService.getSummonerSummary(
        {
          name,
          region,
        },
        { queue: pagination.queue },
      );
      if (!summoner) throw new BadRequestException('Summoner not found');

      const matches = await this.getRecentSummonerMatchesInfoByPuuid(
        summoner,
        pagination,
        region,
      );

      return matches;
    } catch (e) {
      return e;
    }
  }

  private async getRecentSummonerMatchesInfoByPuuid(
    summoner: SummonerEntity,
    pagination: PaginationDto,
    region: string,
  ): Promise<MatchEntity[]> {
    try {
      const { puuid } = summoner;

      const { start = 0, count = 20, queue = 420 } = pagination;
      const reqUrl = `lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queue}&start=${start}&count=${count}`;
      const matchIds: string[] = await this.httpService
        .getAxios(getRegionTypeByValue(region))
        .get(reqUrl);

      let matchesResult: MatchEntity[] = [];
      const existedMatches = await multithreading<string, MatchEntity>(
        matchIds,
        50,
        (arg) => this.findMatchById(arg),
      );
      if (existedMatches.length)
        matchesResult = [...matchesResult, ...existedMatches];

      const idsForRequest = matchIds.filter(
        (id) => !existedMatches.find((match) => match?.matchId === id),
      );

      const matchesFromApi = await multithreading<
        { matchId: string; region: string },
        MatchResponse
      >(
        idsForRequest.map((matchId) => ({ matchId, region })),
        15,
        (arg) => this.getMatchById(arg),
      );
      if (matchesFromApi.length) {
        const newMatchesData: Partial<MatchEntity>[] = matchesFromApi.map(
          (match) => getSummonerInfoFromMatch(match, puuid),
        );
        const createdMatches = await multithreading<
          Partial<MatchEntity>,
          MatchEntity
        >(
          newMatchesData.map((match) => ({
            ...match,
            summoner,
          })),
          15,
          (arg) => this.createMatch(arg),
        );
        matchesResult = [...matchesResult, ...createdMatches];
      }

      return matchesResult.filter((match) => match !== null);
    } catch (e) {
      return e;
    }
  }

  async createMatch(match: Partial<MatchEntity>): Promise<MatchEntity> {
    try {
      const newMatch = this.matchRepository.create(match);
      if (!newMatch) throw new BadRequestException("Can't create match");
      await this.matchRepository.save(newMatch);

      const existedSummoner = await this.summonerRepository.findOne({
        where: { puuid: newMatch.summoner.puuid },
        relations: ['matches'],
      });
      if (!existedSummoner)
        throw new BadRequestException('Summoner does not exist');

      const dataToUpdate: Partial<SummonerEntity> = {
        ...existedSummoner,
        kda: parseFloat(
          (
            (existedSummoner.kda + newMatch.kda) /
            (existedSummoner.matches.length + 1)
          ).toFixed(2),
        ),
        averageCSPM: parseFloat(
          (
            (existedSummoner.averageCSPM + newMatch.csPerMin) /
            (existedSummoner.matches.length + 1)
          ).toFixed(2),
        ),
        averageVisionScore: parseFloat(
          (
            (existedSummoner.averageVisionScore + newMatch.visionScore) /
            (existedSummoner.matches.length + 1)
          ).toFixed(2),
        ),
      };

      await this.summonerService.updateSummoner({
        ...dataToUpdate,
      });

      return this.matchRepository.findOne({
        where: {
          id: newMatch.id,
        },
        relations: ['summoner'],
      });
    } catch (e) {
      return e;
    }
  }

  private async getMatchById({ matchId, region }): Promise<MatchResponse> {
    const reqUrl = `lol/match/v5/matches/${matchId}`;
    return this.httpService.getAxios(getRegionTypeByValue(region)).get(reqUrl);
  }

  private async findMatchById(matchId: string): Promise<MatchEntity> {
    return this.matchRepository.findOne({
      where: { matchId },
      relations: ['summoner'],
    });
  }
}
