import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class getSummonerSummaryQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  queue: number;
}
