import { Controller, Get, Post, Body, Param, Patch, Delete, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';
import { UserApiService } from './user-api.service';

@Controller()
@UseFilters(HttpExceptionFilter)
export class UserApiController {
    constructor(private readonly appService: UserApiService) {}

    @Get('/main/settings')
    getUser(@Body() { token, uId }) {
        return this.appService.getUser(token, uId);
    }

    @Patch('/main/setings')
    updateUser(@Body() { token, uId, data }) {
        return this.appService.updateUser(token, uId, data);
    }

    @Delete('/main/settings')
    deleteUser(@Body() { token, uId }) {
        return this.appService.deleteUser(token, uId);
    }
}
}