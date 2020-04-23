import { Module } from '@nestjs/common';

import { ScheduleApiController } from './schedule-api.controller';
import { ScheduleApiService } from './schedule-api.service';

@Module({
  controllers: [ScheduleApiController],
  providers: [ScheduleApiService],
})
export class ScheduleApiModule {}