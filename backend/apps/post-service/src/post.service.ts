import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';

import { IPost } from './interfaces/post.interface';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(@Inject('POST_MODEL') private readonly postModel: Model<IPost>) {}

  async createPost(createPostDto: CreatePostDto): Promise<IPost> {
    const post = new this.postModel(createPostDto);
    return await post.save();
  }

  async updatePost(postId: string, newData: CreatePostDto): Promise<IPost> {
    return await this.postModel.findByIdAndUpdate(postId, newData, { new: true }).exec();
  }

  async findOne(postId): Promise<IPost> {
    return await this.postModel.findById(postId).exec();
  }

  async findAll(uId: string): Promise<IPost[]> {
    return await this.postModel.find({ uId }).exec();
  }

  async deletePost(postId: string): Promise<IPost> {
    return await this.postModel.findByIdAndDelete(postId).exec();
  }

  async deleteAll(uId: string): Promise<IPost[]> {
    return await this.postModel.deleteMany({ uId }).exec();
  }
  
}
