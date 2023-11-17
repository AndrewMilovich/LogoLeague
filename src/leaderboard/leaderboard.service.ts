import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from './entities/leaderboard.entity';
import { Repository } from 'typeorm';
import { UpdateLeaderboardDto } from './dto/update-leaderboard-dto';
import { Summoner as SummonerEntity } from '../summoner/entities/summoner.entity';
import { GetUserInLeaderboardDto } from './dto/get-user-in-leaderboard-dto';
import { LeaderboardResponse } from '../types/leaderboard';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Leaderboard)
    private leaderboardRepository: Repository<Leaderboard>,
    @InjectRepository(SummonerEntity)
    private summonerRepository: Repository<SummonerEntity>,
  ) {}

  async updateLeaderboard(
    summonerId: string,
    updateData: UpdateLeaderboardDto,
  ): Promise<Leaderboard> {
    try {
      const leaderboard = await this.leaderboardRepository.findOne({
        where: { summoner: { id: summonerId } },
      });
      if (!leaderboard) {
        const newLeaderboard = this.leaderboardRepository.create({
          summoner: { id: summonerId },
          ...updateData,
        });
        await this.leaderboardRepository.save(newLeaderboard);
        return newLeaderboard;
      }
      await this.leaderboardRepository.update(leaderboard.id, updateData);
      return await this.leaderboardRepository.findOne({
        where: { summoner: { id: summonerId } },
      });
    } catch (e) {
      return e;
    }
  }

  async getUserInLeaderboard(
    dto: GetUserInLeaderboardDto,
  ): Promise<LeaderboardResponse> {
    try {
      const { name } = dto;

      const leaderboardByPoints = await this.leaderboardRepository.find({
        relations: ['summoner'],
        order: {
          leaguePoints: 'DESC',
        },
      });
      const pointsIndex = leaderboardByPoints.findIndex(
        (item) => item.summoner.name === name,
      );

      const leaderboardByWinRate = await this.leaderboardRepository.find({
        relations: ['summoner'],
        order: {
          winRate: 'DESC',
        },
      });
      const winRateIndex = leaderboardByWinRate.findIndex(
        (item) => item.summoner.name === name,
      );

      return {
        leaguePoints: { top: pointsIndex + 1 },
        winRate: { top: winRateIndex + 1 },
      };
    } catch (e) {
      return e;
    }
  }
}
