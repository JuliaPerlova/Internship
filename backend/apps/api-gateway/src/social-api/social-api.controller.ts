import { Controller, Get, Post, Body, UseFilters, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';

import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';

import { SocialApiService } from './social-api.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseFilters(HttpExceptionFilter)
export class SocialApiController {
    constructor(private readonly appService: SocialApiService) {}

    @Get('/facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuth(@Req() req) {
        return;
    }

    @Get('/auth/facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    async getConnection(@Req() req) {
        const findUser = await this.appService.findProfileByPId(req.user.provider, req.user.providerId);

        if (findUser) {
            return this.appService.updateProfile(req.user.provider, req.user.providerId, { 
                accessToken: req.user.accessToken, 
                expiredAt: req.user.expiredAt 
            });
        }

        return this.appService.createConnection(req.user);
    }

    @Get('/social/:provider/profile')
    getProfile(@Param() provider: string, @Body() uId: string) {
        return this.appService.getProfile(provider, uId);
    }

    @Patch('/social/:provider/profile')
    updateProfile(@Param() provider: string, @Body() { providerId, data }) {
        return this.appService.updateProfile(provider, providerId, data);
    }

    @Delete('/social/:provider/profile')
    deleteProfile(@Param() provider: string, @Body() providerId: string) {
        return this.appService.deleteProfile(provider, providerId);
    }
}