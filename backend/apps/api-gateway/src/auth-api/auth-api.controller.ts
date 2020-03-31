import { Controller, Get, Post, Body, UseFilters, Redirect, Param } from '@nestjs/common';
import 'dotenv/config';

import { AuthApiService } from './auth-api.service';

import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';

@Controller()
export class AuthApiController {
    constructor(private readonly appService: AuthApiService) {}

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

    @Get('/auth/change/token=:token')
    @UseFilters(HttpExceptionFilter)
    checkToken(@Param('token') token: string) {
        return this.appService.checkToken(token);
    }

    @Post('/auth/change/token=:token')
    @UseFilters(HttpExceptionFilter)
    changePass(
        @Param('token') token: string, 
        @Body() { password }) {
        return this.appService.changePass({ token, password });
    }

    @Get('/auth/confirmation/token=:token')
    @Redirect(`${process.env.FRONT_URL}/auth/login`)
    confirmEmail(@Param('token') token: string) {
        return this.appService.confirmEmail(token);
    }

    @Get('/token=:token/logout')
    logout(@Param('token') token: string) {
        return this.appService.logout(token);
    }
}
