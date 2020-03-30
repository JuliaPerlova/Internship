import { Controller, Get, Post, Body, Req, UseFilters, Redirect, UseGuards, } from '@nestjs/common';
import { Request } from 'express';

import { AuthApiService } from './auth-api.service';

import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';
import { TokenGuard } from '../../../shared/guards/token.guard';

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

    @Get('/auth/:id/change/token=:token')
    @UseFilters(HttpExceptionFilter)
    @UseGuards(TokenGuard)
    checkToken() {
        return false;
    }

    @Post('/auth/:id/change/token=:token')
    @UseFilters(HttpExceptionFilter)
    @UseGuards(TokenGuard)
    changePass(
        @Req() req: Request, 
        @Body() { password }) {
        return this.appService.changePass({ ...req.params, ...req.query, password });
    }

    @Get('/auth/:id/confirmation/token=:token')
    @Redirect('http://localhost:3000/auth/login')
    confirmEmail(@Req() req: Request) {
        return this.appService.confirmEmail({ ...req.params, ...req.query });
    }

    @Get(':id/token=:token/logout')
    logout(@Req() req: Request) {
        return this.appService.logout({ ...req.params, ...req.query });
    }
}
