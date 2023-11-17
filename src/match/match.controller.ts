import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchService } from './match.service';
import { GetSummonerByNameDto } from '../summoner/dto/get-summoner-by-name-dto';
import { PaginationDto } from './dto/pagination-dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get(':name/:region')
  async getRecentSummonerMatches(
    @Param() params: GetSummonerByNameDto,
    @Query() query: PaginationDto,
  ) {
    return this.matchService.getRecentSummonerMatches(params, query);
  }
}
