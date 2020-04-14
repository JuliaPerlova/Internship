import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';

import { ISocial } from './interfaces/social.interface';
import { CreateSocialDto } from './dto/social.dto';
import { UserService } from '../../user-service/src/user.service';

@Injectable()
export class SocialService {
  constructor(
    @Inject('SOCIAL_MODEL') private readonly socialModel: Model<ISocial>,
    private readonly userService: UserService,
    ) {}

  async createConnection(createSocialDto: CreateSocialDto): Promise<ISocial> {
    const user = await this.userService.findUserByEmail(createSocialDto.email);
    
    if (user) {
      createSocialDto.userId = user._id;
    }
    
    return await new this.socialModel(createSocialDto).save();
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
  
  async getAll(userId: string): Promise<ISocial[]> {
    return await this.socialModel.find({ userId }).exec();
  }

  async deleteProfile(provider: string, providerId: string): Promise<ISocial> {
    return await this.socialModel.findByIdAndDelete(provider, providerId).exec();
  }

  async deleteAll(uId: string): Promise<ISocial[]> {
    return await this.socialModel.deleteMany({ uId }).exec();
  }
  
}
