import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class getSummonerSummaryQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value) ?? 420)
  @IsInt()
  queue: number;
}
