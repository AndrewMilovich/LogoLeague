import { forwardRef, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { HttpModule } from '../http/http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summoner } from '../summoner/entities/summoner.entity';
import { Match } from '../match/entities/match.entity';
import { QueueEntity } from './entities/queue.entity';
import { HttpService } from '../http/http.service';
import { SummonerService } from '../summoner/summoner.service';
import { SummonerModule } from '../summoner/summoner.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => SummonerModule),
    TypeOrmModule.forFeature([Summoner, Match, QueueEntity]),
  ],
  controllers: [QueueController],
  providers: [QueueService, HttpService, SummonerService],
})
export class QueueModule {}
