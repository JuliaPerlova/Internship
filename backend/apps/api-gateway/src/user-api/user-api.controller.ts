import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';

import { UserApiService } from './user-api.service';

@Controller()
export class UserApiController {
    constructor(private readonly appService: UserApiService) {}

    @Post('/user/new')
    createUser(@Body() data: object) {
        return this.appService.createUser(data);
    }

    @Get('/users')
    getAllUsers() {
        return this.appService.getAllUsers();
    }

    @Get('/user/find/:id')
    findUser(@Param('id') userId: string) {
        return this.appService.findUser(userId);
    }

    @Patch('/user/:id/update')
    updateUser(@Param('id') userId: string, @Body() newData: object) {
        return this.appService.updateUser(userId, newData);
    }

    @Delete('/user/:id/delete')
    deleteUser(@Param('id') id: string) {
        return this.appService.deleteUser(id);
    }
}