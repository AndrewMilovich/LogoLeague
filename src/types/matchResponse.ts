export interface MatchResponse {
  metadata: Record<string, any>;
  info: MatchInfo;
}

export interface MatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: Participant[];
  platformId: string;
  queueId: number;
  teams: any[];
}

export interface Participant {
  assists: number;
  champLevel: number;
  championName: string;
  deaths: number;
  goldEarned: number;
  gameDuration: number;
  puuid: string;
  role: string;
  summonerName: string;
  totalMinionsKilled: number;
  totalPlayerScore: number;
  win: boolean;
  lane: string;
  kills: number;
  visionScore: number;
}
