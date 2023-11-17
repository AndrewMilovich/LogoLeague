import { forwardRef, Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';
import { HttpModule } from '../http/http.module';
import { HttpService } from '../http/http.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summoner } from './entities/summoner.entity';
import { Match } from '../match/entities/match.entity';
import { QueueEntity } from '../queue/entities/queue.entity';
import { QueueModule } from '../queue/queue.module';
import { QueueService } from '../queue/queue.service';
import { Leaderboard } from '../leaderboard/entities/leaderboard.entity';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => QueueModule),
    TypeOrmModule.forFeature([Summoner, Match, QueueEntity, Leaderboard]),
    QueueModule,
    LeaderboardModule,
  ],
  controllers: [SummonerController],
  providers: [SummonerService, HttpService, QueueService, LeaderboardService],
})
export class SummonerModule {}
