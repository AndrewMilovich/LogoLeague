export interface SummonerResponse {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface SummonerSummary {
  rank: Rank;
  leaguePoints: number;
  wins: number;
  losses: number;
  kda: number;
  averageCSPM: number;
  averageVisionScore: number;
}

export interface Rank {
  name: string;
  image: string;
}
