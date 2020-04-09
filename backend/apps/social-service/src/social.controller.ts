import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { SocialService } from './social.service';
import { CreateSocialDto } from './dto/social.dto';
import { ISocial } from './interfaces/social.interface';

@Controller()
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @MessagePattern({ cmd: 'create connection' })
  createConnection(createSocialDto: CreateSocialDto) {
    return this.socialService.createConnection(createSocialDto);
  }

  @MessagePattern({ cmd: 'find profile by provider id'})
  findProfileByPId({ provider, providerId }) {
    return this.socialService.findProfileByPId(provider, providerId);
  }

  @MessagePattern({ cmd: 'get profile' })
  getProfile({ provider, uId }): Promise<ISocial> {
    return this.socialService.getProfile(provider, uId);
  }

  @MessagePattern({ cmd: 'update profile' })
  updateProfile({ provider, providerId, data }): Promise<ISocial> {
    return this.socialService.updateProfile(provider, providerId, data);
  }

  @MessagePattern({ cmd: 'get all user profiles'})
  getAll({ uId }): Promise<ISocial[]> {
    return this.socialService.getAll(uId);
  }

  @MessagePattern({ cmd: 'delete profile' })
  deleteProfile({ provider, providerId }): Promise<ISocial> {
    return this.socialService.deleteProfile(provider, providerId);
  }

  @MessagePattern({ cmd: 'delete user profiles' })
  deleteAll({ uId }): Promise<ISocial[]> {
    return this.socialService.deleteAll(uId);
  }
}
