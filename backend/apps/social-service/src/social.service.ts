import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';

import { ISocial } from './interfaces/social.interface';
import { CreateSocialDto } from './dto/social.dto';

@Injectable()
export class SocialService {
  constructor(@Inject('SOCIAL_MODEL') private readonly socialModel: Model<ISocial>) {}

  async createConnection(createSocialDto: CreateSocialDto): Promise<ISocial> {
    return await new this.socialModel(createSocialDto);
  }

  async getProfile(userId: string, provider: string): Promise<ISocial> {
    return await this.socialModel.findById(userId, provider).exec();
  }

  async findProfileByPId(provider: string, providerId: string): Promise<ISocial> {
    return await this.socialModel.findOne({ providerId, provider }).exec();
  }

  async updateProfile(provider: string, providerId: string, data: any): Promise<ISocial> {
    return await this.socialModel.findOneAndUpdate({ provider, providerId}, data).exec();
  }
  
  async getAll(uId: string): Promise<ISocial[]> {
    return await this.socialModel.find({ uId }).exec();
  }

  async deleteProfile(provider: string, providerId: string): Promise<ISocial> {
    return await this.socialModel.findByIdAndDelete(provider, providerId).exec();
  }

  async deleteAll(uId: string): Promise<ISocial[]> {
    return await this.socialModel.deleteMany({ uId }).exec();
  }
  
}
