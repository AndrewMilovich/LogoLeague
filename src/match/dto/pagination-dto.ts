import { IsInt, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value) ?? 0)
  @IsOptional()
  @IsInt()
  queue: number;

  @Transform(({ value }) => parseInt(value) ?? 0)
  @IsOptional()
  @IsInt()
  start: number;

  @Transform(({ value }) => parseInt(value) ?? 1)
  @IsOptional()
  @IsInt()
  @Max(50)
  count: number;
}
