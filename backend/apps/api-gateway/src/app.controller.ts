import { Controller, Get, Post, Body, Param, Patch, Delete, Req, UseFilters, Redirect, } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';

import { HttpExceptionFilter } from '../../shared/filters/src/http-exception.filter';
import { ExceptionFilter } from '../../shared/filters/src/rpc-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/auth/login')
  @UseFilters(HttpExceptionFilter)
  login(@Body() data: object) {
    return this.appService.login(data);
  }

  @Post('/auth/sign-up')
  @UseFilters(HttpExceptionFilter)
  signUp(@Body() data: object) {
    return this.appService.signUp(data);
  }

  @Post('/auth/forgot')
  forgotPass(@Body() { email }) {
    return this.appService.forgotPass(email);
  }

  @Get('/auth/:id/forgot/token=:token')
  @Redirect('http://localhost:3000/auth/:id/forgot/token=:token')
  @UseFilters(HttpExceptionFilter)
  checkToken(@Req() req: Request) {
    return this.appService.checkToken({ ...req.params, ...req.query });
  }

  @Post('/auth/forgot/change')
  changePass(@Body() { id, token, password }) {
    return this.appService.changePass({ id, token, password });
  }

  @Get('/auth/:id/confirmation/token=:token')
  @Redirect('http://localhost:3000/auth/login')
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

  @Get(':id/token=:token/logout')
  logout(@Req() req: Request) {
    return this.appService.logout({ ...req.params, ...req.query });
  }

}
