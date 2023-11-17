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

@Module({
  imports: [
    HttpModule,
    forwardRef(() => QueueModule),
    TypeOrmModule.forFeature([Summoner, Match, QueueEntity]),
  ],
  controllers: [SummonerController],
  providers: [SummonerService, HttpService, QueueService],
})
export class SummonerModule {}
