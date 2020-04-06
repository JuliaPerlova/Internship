import { Controller, Get, Post, Body, UseFilters, Param, Delete, Patch } from '@nestjs/common';

import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';

import { PostApiService } from './post-api.service';

@Controller()
@UseFilters(HttpExceptionFilter)
export class PostApiController {
    constructor(private readonly appService: PostApiService) {}

    @Get('/main/posts')
    getPosts(@Body() { token, uId }) {
        return this.appService.getPosts(token, uId);
    }

    @Post('/main/posts/new')
    createPost(@Body() token: string, data: object) {
        return this.appService.createPost(token, data);
    }
    
    @Get('/main/posts/:postId')
    getPost(@Param() postId: string, @Body() token: string) {
        return this.appService.findPost(token, postId);
    }

    @Patch('/main/posts/:postId')
    updatePost(@Param() postId: string, @Body() token: string, data: object) {
        return this.appService.updatePost(postId, token, data);
    }

    @Delete('/main/posts/:postId')
    deletePost(@Param() postId: string, @Body() token: string) {
        return this.appService.deletePost(token, postId);
    }
}