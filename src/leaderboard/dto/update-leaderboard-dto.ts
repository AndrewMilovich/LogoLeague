import { IsInt, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateLeaderboardDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  leaguePoints: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Max(100)
  winRate: number;
}
