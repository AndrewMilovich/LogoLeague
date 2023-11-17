import { Controller, Get, Param, Query } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { GetSummonerByNameDto } from './dto/get-summoner-by-name-dto';
import { getSummonerSummaryQueryDto } from './dto/get-summoner-summary-query-dto';
import { Summoner } from './entities/summoner.entity';

@Controller('summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Get('/:name/:region')
  async getSummonerByName(@Param() dto: GetSummonerByNameDto) {
    return this.summonerService.getSummonerByName(dto);
  }

  @Get('summary/:name/:region')
  async getSummonerSummary(
    @Param() dto: GetSummonerByNameDto,
    @Query() query: getSummonerSummaryQueryDto,
  ): Promise<Summoner> {
    query.queue = query.queue ? query.queue : 420;
    return this.summonerService.getSummonerSummary(dto, query);
  }
}
