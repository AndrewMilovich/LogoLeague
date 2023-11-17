import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '../http/http.service';
import { Summoner as SummonerEntity } from '../summoner/entities/summoner.entity';
import { Repository } from 'typeorm';
import { QueueEntity } from './entities/queue.entity';
import { LeagueResponse } from '../types/league';
import { multithreading } from '../utils/multithreading';
import { createQueueData } from '../utils/queue';
import { SummonerService } from '../summoner/summoner.service';

@Injectable()
export class QueueService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => SummonerService))
    private readonly summonerService: SummonerService,
    @InjectRepository(QueueEntity)
    private queueRepository: Repository<QueueEntity>,
  ) {}

  async getSummonerQuesInfo(summoner: SummonerEntity, region: string) {
    try {
      const reqUrl = `lol/league/v4/entries/by-summoner/${summoner.summonerId}`;
      const requestedQueues: LeagueResponse[] = await this.httpService
        .getAxios(region)
        .get(reqUrl);

      const existedQueues = await this.queueRepository.find({
        where: { summoner: { id: summoner.id } },
      });

      const existedQueuesTypes = existedQueues?.map((queue) => queue.queueType);

      const queuesToCreate = requestedQueues.filter(
        (requestedQueue) =>
          !existedQueuesTypes?.includes(requestedQueue.queueType),
      );

      if (queuesToCreate) {
        const queuesData: Partial<QueueEntity>[] = createQueueData(
          queuesToCreate,
          summoner,
        );
        await multithreading<Partial<QueueEntity>, QueueEntity>(
          queuesData,
          15,
          (arg) => this.createQueue(arg),
        );
      }
      const updatedQueues = await multithreading<
        Partial<QueueEntity>,
        QueueEntity
      >(createQueueData(requestedQueues, summoner), 15, (arg) =>
        this.updateQueue(arg),
      );

      if (updatedQueues.length) {
        const summonerDataToUpdate: Partial<SummonerEntity> = {
          wins: updatedQueues.reduce((acc, queue) => acc + queue.wins, 0),
          losses: updatedQueues.reduce((acc, queue) => acc + queue.losses, 0),
        };
        await this.summonerService.updateSummoner({
          id: summoner.id,
          ...summonerDataToUpdate,
        });
      }

      return updatedQueues;
    } catch (e) {
      return e;
    }
  }

  async createQueue(queue: Partial<QueueEntity>): Promise<QueueEntity> {
    try {
      const newQueue = this.queueRepository.create(queue);
      await this.queueRepository.save(newQueue);
      return newQueue;
    } catch (e) {
      return e;
    }
  }

  async updateQueue(queue: Partial<QueueEntity>): Promise<QueueEntity> {
    try {
      const existedQueue = await this.queueRepository.findOne({
        where: { id: queue.id },
      });
      if (!existedQueue) throw new BadRequestException('Queue does not exist');

      const dataToUpdate = { ...existedQueue, queue };
      return this.queueRepository.save(dataToUpdate);
    } catch (e) {
      return e;
    }
  }
}
