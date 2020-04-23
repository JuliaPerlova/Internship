import { Module } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { AgendaModule } from 'nestjs-agenda';
import 'dotenv/config';

import { DatabaseModule } from '../../shared/database/src/database.module';
import { SocialModule } from '../../social-service/src/social.module';
import { MailServiceModule } from '../../shared/mail-service/src/mail-service.module';
import { PostModule } from '../../post-service/src/post.module';
import { UserModule } from '../../user-service/src/user.module';

import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { scheduleProviders } from './schedule.providers';

@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.register(),
    AgendaModule.register({ db: { address: process.env.MONGO_URI }}),
    SocialModule,
    MailServiceModule,
    PostModule,
    UserModule,
  ],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    ...scheduleProviders,
  ],
})
export class ScheduleServiceModule {}
