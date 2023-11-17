import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { GetSummonerByNameDto } from './dto/get-summoner-by-name-dto';
import { SummonerResponse } from '../types/summonerResponse';
import { getSummonerSummaryQueryDto } from './dto/get-summoner-summary-query-dto';
import { Summoner as SummonerEntity } from './entities/summoner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueService } from '../queue/queue.service';
import { queues } from '../utils/app';

@Injectable()
export class SummonerService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => QueueService))
    private readonly queueService: QueueService,
    @InjectRepository(SummonerEntity)
    private summonerRepository: Repository<SummonerEntity>,
  ) {}

  async getSummonerByName({
    name,
    region,
  }: GetSummonerByNameDto): Promise<SummonerEntity> {
    try {
      const existedSummoner = await this.summonerRepository.findOne({
        where: { name },
      });
      if (existedSummoner) {
        await this.queueService.getSummonerQuesInfo(existedSummoner, region);
        return this.summonerRepository.findOne({
          where: { name },
          relations: ['queues'],
        });
      }

      const reqUrl = `lol/summoner/v4/summoners/by-name/${name}`;
      const requestedSummoner: SummonerResponse = await this.httpService
        .getAxios(region)
        .get(reqUrl);
      if (!requestedSummoner)
        throw new BadRequestException('Summoner not found');

      const newSummonerData: Partial<SummonerEntity> = {
        name,
        puuid: requestedSummoner.puuid,
        accountId: requestedSummoner.accountId,
        summonerId: requestedSummoner.id,
        summonerLevel: requestedSummoner.summonerLevel,
        profileIconId: requestedSummoner.profileIconId,
      };

      const createdSummoner = await this.createSummoner(newSummonerData);
      await this.queueService.getSummonerQuesInfo(createdSummoner, region);
      return this.summonerRepository.findOne({
        where: { id: createdSummoner.id },
        relations: ['queues'],
      });
    } catch (e) {
      return e;
    }
  }

  async getSummonerSummary(
    params: GetSummonerByNameDto,
    query?: getSummonerSummaryQueryDto,
  ) {
    try {
      const { name, region } = params;

      const summoner = await this.getSummonerByName({ name, region });
      if (!summoner) throw new BadRequestException('Summoner not found');
      let summonerResult;
      if (query?.queue) {
        if (!queues.find((q) => q.queueId === +query.queue))
          throw new BadRequestException('Invalid queue');

        const filteredQueues = summoner.queues.filter(
          (queueItem) => queueItem.queueId === +query.queue,
        );
        summonerResult = {
          ...summoner,
          queues: filteredQueues,
          leaguePoints: filteredQueues[0]?.leaguePoints,
        };
      } else {
        summonerResult = {
          ...summoner,
          leaguePoints: summoner.queues.map((q) => q.leaguePoints),
        };
      }
      return summonerResult;
    } catch (e) {
      return e;
    }
  }

  async createSummoner(
    summoner: Partial<SummonerEntity>,
  ): Promise<SummonerEntity> {
    try {
      const newSummoner = this.summonerRepository.create(summoner);

      if (!newSummoner) throw new BadRequestException("Can't create summoner");
      await this.summonerRepository.save(newSummoner);

      return newSummoner;
    } catch (e) {
      return e;
    }
  }

  async updateSummoner(
    summoner: Partial<SummonerEntity>,
  ): Promise<SummonerEntity> {
    try {
      const existedSummoner = await this.summonerRepository.findOne({
        where: { id: summoner.id },
      });
      if (!existedSummoner)
        throw new BadRequestException('Summoner does not exist');

      const dataToUpdate = { ...existedSummoner, ...summoner };
      return this.summonerRepository.save(dataToUpdate);
    } catch (e) {
      return e;
    }
  }

  async findSummonerById(puuid: string): Promise<SummonerEntity> {
    try {
      const summoner = await this.summonerRepository.findOne({
        where: { puuid },
      });
      if (!summoner)
        throw new BadRequestException('SummonerResponse not found');
      return summoner;
    } catch (e) {
      return e;
    }
  }

  async findSummonerByName(name: string): Promise<SummonerEntity> {
    try {
      const summoner = await this.summonerRepository.findOne({
        where: { name },
      });
      if (!summoner)
        throw new BadRequestException("Can't find summoner by name");
      return summoner;
    } catch (e) {
      return e;
    }
  }
}
