import { IsString } from 'class-validator';

export class GetUserInLeaderboardDto {
  @IsString()
  name: string;
}
