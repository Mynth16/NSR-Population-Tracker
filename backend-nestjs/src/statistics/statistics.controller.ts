import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('api/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('population')
  getPopulationStats() {
    return this.statisticsService.getPopulationStats();
  }

  @Get('zones')
  getZoneStats() {
    return this.statisticsService.getZoneStats();
  }

  @Get('age-groups')
  getAgeGroupStats() {
    return this.statisticsService.getAgeGroupStats();
  }
}
