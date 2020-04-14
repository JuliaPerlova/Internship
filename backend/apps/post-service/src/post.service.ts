import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';

import { IPost } from './interfaces/post.interface';
import { ITemplate } from './interfaces/template.interface';
import { CreatePostDto } from './dto/post.dto';
import { CreateTemplateDto } from './dto/template.dto';
import facebookPostTemplate from './templates/facebook.template';
import linkedinPostTemplate from './templates/linkedin.template';

@Injectable()
export class PostService {
  static templates = [facebookPostTemplate, linkedinPostTemplate];
  constructor(
    @Inject('POST_MODEL') private readonly postModel: Model<IPost>,
    @Inject('TEMPLATE_MODEL') private readonly templateModel: Model<ITemplate>,
  ) {}

  getTemplates(providers: string[]) {
    return providers.map((provider) => {
      return PostService.templates.filter((t) => t.provider === provider)[0];
    });
  }

  async createPost(createPostDto: CreatePostDto, template: CreateTemplateDto[]): Promise<IPost> {
    const postTemplate = await new this.templateModel(template).save();
    const templateId = postTemplate._id;
    const post = new this.postModel({ ...createPostDto, templateId });
    return await post.save();
  }

  async updatePost(postId: string, newData: CreatePostDto): Promise<IPost> {
    return await this.postModel.findByIdAndUpdate(postId, newData, { new: true }).exec();
  }

  async findOne(postId): Promise<[IPost, ITemplate]> {
    const post = await this.postModel.findById(postId).exec();
    const template = await this.templateModel.findById(post.templateId).exec();
    return [post, template];
  }

  async findAll(uId: string): Promise<IPost[]> {
    const posts = await this.postModel.find({ uId }).exec();
    return posts.map((p) => [p, this.templateModel.findById(p.templateId)]);
  }

  async deletePost(postId: string): Promise<Boolean> {
    const post = await this.postModel.findByIdAndDelete(postId).exec();
    await this.templateModel.findByIdAndDelete(post.templateId).exec();
    return true;
  }

  async deleteAll(uId: string): Promise<Boolean> {
    await this.postModel.deleteMany({ uId }).exec();
    return true;
  }
  
}
