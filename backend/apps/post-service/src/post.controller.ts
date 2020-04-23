import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthGuard } from '../../shared/guards/auth.guard';

import { PostService } from './post.service';
import { IPost } from './interfaces/post.interface';
import { ITemplate } from './interfaces/template.interface';

@Controller()
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern({ cmd: 'get template'})
  getTemplate({ providers }) {
    return this.postService.getTemplates(providers);
  }

  @MessagePattern({ cmd: 'create post' })
  async newPost({ data, template }): Promise<IPost> {
    return this.postService.createPost(data, template);
  }

  @MessagePattern({ cmd: 'update post' })
  updatePost({ postId, newData }): Promise<IPost> {
    return this.postService.updatePost(postId, newData);
  }

  @MessagePattern({ cmd: 'find post' })
  findOne({ postId }): Promise<[IPost, ITemplate]> {
    return this.postService.findOne(postId);
  }

  @MessagePattern({ cmd: 'get posts' })
  findAll({ uId }): Promise<IPost[]> {
    return this.postService.findAll(uId);
  }

  @MessagePattern({ cmd: 'delete post' })
  async deletePost({ postId }): Promise<Boolean> {
    return this.postService.deletePost(postId);
  }

  @MessagePattern({ cmd: 'delete all' })
  deleteAll({ userId }): Promise<Boolean> {
    return this.postService.deleteAll(userId);
  }

}
