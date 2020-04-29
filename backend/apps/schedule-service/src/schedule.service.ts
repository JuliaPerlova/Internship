import { Injectable, Inject } from '@nestjs/common';
import { RpcException, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { AgendaService } from 'nestjs-agenda';

import { CreatePostDto } from '../../post-service/src/dto/post.dto';
import { PostService } from '../../post-service/src/post.service';
import { CreateTemplateDto } from '../../post-service/src/dto/template.dto';
import { UserService } from '../../user-service/src/user.service';
import { MailServiceService } from '../../shared/mail-service/src/mail-service.service';
import { SocialService } from '../../social-service/src/social.service';

import { ISchedule } from './interfaces/schedule.interface';
import { statusEnum } from './enums/status.enum';

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
        port: 8040,
      },
    });
  }
  
  async createSchedule(
    createPostDto: CreatePostDto, 
    template: CreateTemplateDto, 
    date: Date,
  ): Promise<ISchedule> {
    const newPost = await this.postService.createPost(createPostDto, template);
    const { _id, uId, providers } = newPost;

    const schedule = { 
      uId, 
      providers, 
      postId: _id, 
      notify: false, 
      startsAt: date,
      status: statusEnum.waiting 
    };

    if(date) {
      schedule['startsAt'] = date;
    }

    const createdSchedule = await new this.scheduleModel(schedule).save();

    await this.publishSchedule(createdSchedule._id, date);

    return createdSchedule;

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
    const schedules = await this.scheduleModel.find({ uId, status: statusEnum.waiting }).exec();
    return schedules.map(async(schedule) => { 
      const post = await this.postService.findOne(schedule.postId);
      return { schedule, post };
    })
  }

  async findPublished(scheduleId: string) {
    const { postId, providers } = await this.findOne(scheduleId);
    const [post, template] = await this.postService.findOne(postId);

    const socialReactions = await Promise.all(providers.map(async({ provider, providerId }) => {

      const asset = post.links.filter((link) => link.provider === provider);

      const { accessToken } = await this.socialService.findProfileByPId(provider, providerId);
      return await this.apiClient.send<object>(
        { cmd: `${provider} get social reactions`}, 
        { postId, accessToken, asset},
      ).toPromise().then((data) => data);
    }));

    return [post, template, socialReactions];

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
    const { links } = post; 

    Promise.all(schedule.providers.map(async({ provider, providerId }) => {
      const { accessToken } = await this.socialService.findProfileByPId(provider, providerId);

      const attachments = await Promise.all(post.body.attachments.map(async(attach) => {
        return await this.apiClient.send<object>(
          { cmd: `${provider} upload image`}, 
          { attach, providerId, accessToken },
        ).toPromise().then((data) => data).catch((err) => err);
      }));

      const link = await this.apiClient.send<object>(
        { cmd: `${provider} create share`},
        { post, providerId, accessToken, links: attachments },
      ).toPromise().then((data) => data).catch((err) => err);

      if (!link) {
        this.sendEmail(email, 'fail');
        this.updateSchedule(scheduleId, { status: statusEnum.rejected, notify: true });
        throw new RpcException("Post can't be published");
      }

      links.push({ provider, link: `${link}` });
      return this.sendEmail(email, 'success', link);
    }))
    .catch(() => {
      this.sendEmail(email, 'fail');
      this.updateSchedule(scheduleId, { status: statusEnum.rejected, notify: true });
      throw new RpcException("Post can't be published");
    });

    await this.postService.updatePost(schedule.postId, { links })
    this.agenda.cancel({ name: scheduleId });
    this.updateSchedule(scheduleId, { status: statusEnum.published, notify: true });
  }

  async publishSchedule(scheduleId, date) {
    if(!date) {
      return await this.createPost(scheduleId);
    }

    this.agenda.define(`${scheduleId}`, async job => {
      const { scheduleId } = job.attrs.data;
      await this.createPost(scheduleId);
    });

    await this.agenda.create(`${scheduleId}`, { scheduleId }).schedule(date).save();
  }
}
