import { queues } from './app';
import { Summoner } from '../summoner/entities/summoner.entity';
import { LeagueResponse } from '../types/league';

export const createQueueData = (
  queuesToCreate: LeagueResponse[],
  summoner: Summoner,
) => {
  return queuesToCreate.map((queue) => ({
    queueType: queue.queueType,
    queueId: queues.find((q) => q.queueName === queue.queueType).queueId,
    rank: queue.rank,
    tier: queue.tier,
    losses: queue.losses,
    wins: queue.wins,
    leaguePoints: queue.leaguePoints,
    summoner: summoner,
  }));
};
