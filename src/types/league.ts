export interface LeagueResponse {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  summonerId: string;
  summonerName: string;
  queueType: string;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
}
