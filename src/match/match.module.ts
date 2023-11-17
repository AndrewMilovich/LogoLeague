import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { HttpModule } from '../http/http.module';
import { HttpService } from '../http/http.service';
import { SummonerService } from '../summoner/summoner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summoner } from '../summoner/entities/summoner.entity';
import { Match } from './entities/match.entity';
import { QueueModule } from '../queue/queue.module';
import { QueueService } from '../queue/queue.service';
import { QueueEntity } from '../queue/entities/queue.entity';

@Module({
  imports: [
    HttpModule,
    QueueModule,
    TypeOrmModule.forFeature([Summoner, Match, QueueEntity]),
  ],
  controllers: [MatchController],
  providers: [MatchService, HttpService, SummonerService, QueueService],
})
export class MatchModule {}
