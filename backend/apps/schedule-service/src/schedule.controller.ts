import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { ScheduleService } from './schedule.service';
import { ISchedule } from './interfaces/schedule.interface';

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @MessagePattern({ cmd: 'create schedule'})
  createSchedule({ post, date, template }): Promise<ISchedule> {
    return this.scheduleService.createSchedule(post, template, date);
  }

  @MessagePattern({ cmd: 'update schedule'})
  updateSchedule({ scheduleId, newData }): Promise<ISchedule> {
    return this.scheduleService.updateSchedule(scheduleId, newData);
  }

  @MessagePattern({ cmd: 'find one schedule' })
  findOne(scheduleId: string): Promise<ISchedule> {
    return this.scheduleService.findOne(scheduleId);
  }

  @MessagePattern({ cmd: 'find unpublished schedule'})
  findUnpublished(uId): Promise<ISchedule[]> {
    return this.scheduleService.findUnpublished(uId);
  }

  @MessagePattern({ cmd: 'find all schedules'})
  findAll(uId: string): Promise<ISchedule[]> {
    return this.scheduleService.findAll(uId);
  }

  @MessagePattern({ cmd: 'delete one schedule' })
  deleteOne(scheduleId: string): Promise<ISchedule> {
    return this.scheduleService.deleteOne(scheduleId);
  }
}
