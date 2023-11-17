import { Controller, Get, Param } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { GetUserInLeaderboardDto } from './dto/get-user-in-leaderboard-dto';
import { LeaderboardResponse } from '../types/leaderboard';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get(':name')
  async getUserInLeaderboard(
    @Param() dto: GetUserInLeaderboardDto,
  ): Promise<LeaderboardResponse> {
    return this.leaderboardService.getUserInLeaderboard(dto);
  }
}
