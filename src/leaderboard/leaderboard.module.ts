import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summoner } from '../summoner/entities/summoner.entity';
import { Match } from '../match/entities/match.entity';
import { QueueEntity } from '../queue/entities/queue.entity';
import { Leaderboard } from './entities/leaderboard.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Summoner, Match, QueueEntity, Leaderboard]),
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
export class LeaderboardModule {}
