import { Injectable, Inject } from '@nestjs/common';
import { RpcException, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { AgendaService } from 'nestjs-agenda';

import { CreatePostDto } from '../../post-service/src/dto/post.dto';
import { PostService } from '../../post-service/src/post.service';
import { UserService } from '../../user-service/src/user.service';
import { MailServiceService } from '../../shared/mail-service/src/mail-service.service';
import { SocialService } from '../../social-service/src/social.service';

import { ISchedule } from './interfaces/schedule.interface';
import { statusEnum } from './enums/status.enum';
import { CreateTemplateDto } from 'post-service/src/dto/template.dto';

@Injectable()
export class ScheduleService {
  private apiClient: ClientProxy;
  constructor( 
    @Inject('SCHEDULE_MODEL') private scheduleModel: Model<ISchedule>,
    private readonly agenda: AgendaService,
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly socialService: SocialService,
    private readonly mailService: MailServiceService,
  ) { 
    this.apiClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000,
      },
    });
  }
  
  async createSchedule(
    createPostDto: CreatePostDto, 
    template: CreateTemplateDto, 
    date: Date,
  ): Promise<ISchedule> {

    const newPost = await this.postService.createPost(createPostDto, template);
    const { _id, uId, providerId } = newPost;

    const schedule = await new this.scheduleModel({ 
      uId, 
      providerId, 
      postId: _id, 
      notify: false, 
      startsAt: date,
      status: statusEnum.waiting 
    }).save();

    this.publishSchedule(schedule._id, date);

    return schedule;

  }

  async updateSchedule(scheduleId: string, newData: object): Promise<ISchedule> {
    return await this.scheduleModel.findByIdAndUpdate(scheduleId, newData, { new: true }).exec();
  }

  async findOne(scheduleId: string): Promise<ISchedule> {
    return await this.scheduleModel.findById(scheduleId).exec();
  }

  async findAll(uId: string): Promise<ISchedule[]> {
    return await this.scheduleModel.find({ uId }).exec();
  }

  async findUnpublished(uId: string): Promise<ISchedule[]> {
    return await this.scheduleModel.find({ uId, status: statusEnum.waiting }).exec();
  }

  async deleteOne(scheduleId: string): Promise<ISchedule> {
    await this.agenda.cancel({ name: scheduleId });
    return await this.scheduleModel.findByIdAndDelete(scheduleId).exec();
  }

  private async sendEmail(email: string, message: string, link?) {
    switch(message) {
      case 'fail': 
          await this.mailService.failPublish(email);
          break;
      case 'success':
          await this.mailService.successPublish(email, link);
          break;
    }
  }

  private async createPost(scheduleId: string) {
    const schedule = await this.findOne(scheduleId);
    const [post, template] = await this.postService.findOne(schedule.postId);
    const { email } = await this.userService.findUser(schedule.uId);
    let images = null;

    Promise.all(schedule.providers.map(async({ provider, providerId }) => {
      const { accessToken } = await this.socialService.findProfileByPId(provider, providerId);
      
      if (template.attachments.video) {
        const link = await this.apiClient.send<object>(
          { cmd: `${provider} create video share` }, 
          { post, providerId, accessToken },
        );
        return this.sendEmail(email, 'success', link);
      }

      if (template.attachments.image) {
        images = await Promise.all(post.body.attachments.map(async(img) => {
          await this.apiClient.send<object>(
            { cmd: `${provider} upload image`}, 
            { img, providerId, accessToken },
          );
        }));
      }

      const link = await this.apiClient.send<object>(
        { cmd: `${provider} create share`},
        { post, providerId, accessToken, links: images },
      );

      return this.sendEmail(email, 'success', link);
    }))
    .catch(() => {
      this.sendEmail(email, 'fail');
      this.updateSchedule(scheduleId, { status: statusEnum.rejected, notify: true });
      throw new RpcException("Post can't be published");
    });

    this.agenda.cancel({ name: scheduleId });
    this.updateSchedule(scheduleId, { status: statusEnum.published, notify: true });
  }

  async publishSchedule(scheduleId, date) {
    if(!date) {
      return await this.createPost(scheduleId);
    }

    this.agenda.define(scheduleId, async job => {
      return await this.createPost(scheduleId);
    })
    
    const dateString = date.toString();
    await this.agenda.create(scheduleId).schedule(dateString).save();
  }
}
