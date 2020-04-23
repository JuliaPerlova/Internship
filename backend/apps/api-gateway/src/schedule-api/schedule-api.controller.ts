import { Controller, Get, Post, Body, UseFilters, Param, Delete, Patch } from '@nestjs/common';

import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';

import { ScheduleApiService } from './schedule-api.service';

@Controller()
@UseFilters(HttpExceptionFilter)
export class ScheduleApiController {
    constructor(private readonly appService: ScheduleApiService) {}

    @Post('/main/schedule/new') 
    createSchedule(@Body() { post, date }) {
        return this.appService.createSchedule(post, date);
    }

    @Post('/main/schedule/update')
    updateSchedule(@Body() { scheduleId, newData }) {
        return this.appService.updateSchedule(scheduleId, newData);
    }

    @Get('/main/schedules/:uId')
    getAll(@Param('uId') uId: string) {
        return this.appService.getAll(uId);
    }

    @Get('/main/schdule/:scheduleId')
    getOne(@Param('scheduleId') scheduleId: string) {
        return this.appService.findOne(scheduleId);
    }

    @Get('/main/schedules/unpublished/:uId')
    getUnpublished(@Param('uId') uId: string) {
        return this.appService.getUnpublished(uId);
    }

    @Delete('/main/schedule/:scheduleId')
    deleteOne(@Param('scheduleId') scheduleId: string) {
        return this.appService.deleteOne(scheduleId);
    }

}