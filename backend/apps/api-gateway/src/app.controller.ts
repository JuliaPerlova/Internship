import { Controller, Get, Post, Body, Param, Patch, Delete, Req } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/auth/login')
  login(@Body() data: object) {
    return this.appService.login(data);
  }

  @Post('/auth/sign-up')
  signUp(@Body() data: object) {
    return this.appService.signUp(data);
  }

  @Post('/auth/forgot')
  forgotPass(@Body() data: object) {
    return this.appService.forgotPass(data);
  }

  @Post('/auth/:id/forgot/token=:token')
  changePass(@Param('id') id: string, @Body() { password }) {
    return this.appService.changePass({ id, password });
  }

  @Get('/auth/:id/confirmation/token=:token')
  confirmEmail(@Req() req: Request) {
    return this.appService.confirmEmail({ ...req.params, ...req.query });
  }

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
