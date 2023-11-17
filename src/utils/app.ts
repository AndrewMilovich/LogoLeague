import { Region } from '../types';
import { MatchResponse } from '../types/matchResponse';
import { Match } from '../match/entities/match.entity';
import { Queue } from '../types/queue';

export const regions: Region[] = [
  { value: 'BR1', type: 'americas' },
  { value: 'EUN1', type: 'europe' },
  { value: 'EUW1', type: 'europe' },
  { value: 'JP1', type: 'asia' },
  { value: 'KR', type: 'asia' },
  { value: 'LA1', type: 'americas' },
  { value: 'LA2', type: 'americas' },
  { value: 'NA1', type: 'americas' },
  { value: 'OC1', type: 'sea' },
  { value: 'PH2', type: 'sea' },
  { value: 'RU', type: 'europe' },
  { value: 'SG2', type: 'sea' },
  { value: 'TH2', type: 'sea' },
  { value: 'TR1', type: 'europe' },
  { value: 'TW2', type: 'sea' },
  { value: 'VN2', type: 'sea' },
];

export const queues: Queue[] = [
  {
    queueId: 420,
    queueName: 'RANKED_SOLO_5x5',
  },
  {
    queueId: 440,
    queueName: 'RANKED_FLEX_SR',
  },
  {
    queueId: 430,
    queueName: 'NORMAL_BLIND_PICK',
  },
  {
    queueId: 400,
    queueName: 'NORMAL_DRAFT_PICK',
  },
  {
    queueId: 450,
    queueName: 'ARAM',
  },
  {
    queueId: 0,
    queueName: 'ALL',
  },
];

export const getRegionTypeByValue = (
  value: string,
): Region['type'] | undefined => {
  return regions.find((region) => region.value === value).type;
};

export const getSummonerInfoFromMatch = (
  match: MatchResponse,
  puuid: string,
): Partial<Match> => {
  const playerInfo = match.info.participants.find(
    (part) => part.puuid === puuid,
  );
  const kda = (playerInfo.kills + playerInfo.assists) / playerInfo.deaths;

  return {
    championName: playerInfo.championName,
    champLevel: +playerInfo.champLevel,
    goldEarned: +playerInfo.goldEarned,
    lane: playerInfo.lane,
    role: playerInfo.role,
    totalPlayerScore: +playerInfo.totalPlayerScore || 0,
    matchId: match.metadata.matchId,
    queueId: +match.info.queueId,
    kda,
    visionScore: +playerInfo.visionScore,
    csPerMin: Math.round(
      playerInfo.totalMinionsKilled / (match.info.gameDuration / 60000),
    ),
    win: !!playerInfo.win,
  };
};
