import { Controller, Get, Post, Body, UseFilters, Param, Delete, Patch } from '@nestjs/common';

import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';

import { PostApiService } from './post-api.service';

@Controller()
@UseFilters(HttpExceptionFilter)
export class PostApiController {
    constructor(private readonly appService: PostApiService) {}

    @Post('/template') 
    getTemplate(@Body() providers: string[]) {
        return this.appService.getTemplate(providers);
    }

    @Post('/main/posts')
    getPosts(@Body() { token, uId }) {
        return this.appService.getPosts(token, uId);
    }

    @Post('/main/posts/new')
    createPost(@Body() { token, data, template }) {
        return this.appService.createPost(token, data, template);
    }
    
    @Post('/main/posts/:postId')
    getPost(@Param() postId: string, @Body() token: string) {
        return this.appService.findPost(token, postId);
    }

    @Patch('/main/posts/:postId')
    updatePost(@Param() postId: string, @Body() { token, data }) {
        return this.appService.updatePost(postId, token, data);
    }

    @Delete('/main/posts/:postId')
    deletePost(@Param() postId: string, @Body() token: string) {
        return this.appService.deletePost(token, postId);
    }
}