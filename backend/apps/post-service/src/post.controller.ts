import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthGuard } from '../../shared/guards/auth.guard';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';
import { IPost } from './interfaces/post.interface';

@Controller()
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern({ cmd: 'create post' })
  async newPost({ createPostDto }): Promise<IPost> {
    return this.postService.createPost(createPostDto);
  }

  @MessagePattern({ cmd: 'update post' })
  updatePost(postId: string, newData: CreatePostDto): Promise<IPost> {
    return this.postService.updatePost(postId, newData);
  }

  @MessagePattern({ cmd: 'find post' })
  findOne(postId: string): Promise<IPost> {
    return this.postService.findOne(postId);
  }

  @MessagePattern({ cmd: 'get posts' })
  findAll({ uId }): Promise<IPost[]> {
    return this.postService.findAll(uId);
  }

  @MessagePattern({ cmd: 'delete post' })
  async deletePost(postId): Promise<IPost> {
    return this.postService.deletePost(postId);
  }

  @MessagePattern({ cmd: 'delete all' })
  deleteAll(userId): Promise<IPost[]> {
    return this.postService.deleteAll(userId);
  }

}
