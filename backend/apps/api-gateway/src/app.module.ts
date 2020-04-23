import { Module } from '@nestjs/common';

import { UserApiModule } from './user-api/user-api.module';
import { AuthApiModule } from './auth-api/auth-api.module';
import { PostApiModule } from './posts-api/post-api.module';
import { SocialApiModule } from './social-api/social-api.module';
import { ScheduleApiModule } from './schedule-api/schedule-api.module';

@Module({
  imports: [
    UserApiModule, 
    AuthApiModule, 
    PostApiModule,
    SocialApiModule,
    ScheduleApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
