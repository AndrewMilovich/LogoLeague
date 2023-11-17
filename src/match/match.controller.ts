import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchService } from './match.service';
import { GetSummonerByNameDto } from '../summoner/dto/get-summoner-by-name-dto';
import { PaginationDto } from './dto/pagination-dto';
import { Match } from './entities/match.entity';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get(':name/:region')
  async getRecentSummonerMatches(
    @Param() params: GetSummonerByNameDto,
    @Query() query: PaginationDto,
  ): Promise<Match[]> {
    query.queue = query.queue ? query.queue : 420;
    query.count = query.count ? query.count : 1;
    query.start = query.start ? query.start : 0;
    return this.matchService.getRecentSummonerMatches(params, query);
  }
}
