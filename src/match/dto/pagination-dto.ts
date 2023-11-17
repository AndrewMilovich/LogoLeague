import { IsInt, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  queue: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  start: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Max(50)
  count: number;
}
