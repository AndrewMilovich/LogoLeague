import { IsIn, IsString } from 'class-validator';
import { regions } from '../../utils/app';

export class GetSummonerByNameDto {
  @IsString()
  name: string;

  @IsIn(regions.map((region) => region.value))
  region: string;
}
