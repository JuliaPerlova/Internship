import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { authenticate } from 'passport';
import { PassportModule } from '@nestjs/passport';

import { SocialApiController } from './social-api.controller';
import { SocialApiService } from './social-api.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { LinkedinStrategy } from './strategies/linkedin.strategy';
import { LinkedinApiModule } from './linkedin-api/linkedin-api.module';

@Module({
  imports: [
    PassportModule.register({ 
      facebookStrategy: 'facebook',
      linkedinStrategy: 'linkedin',
    }),
    LinkedinApiModule,
  ],
  controllers: [SocialApiController],
  providers: [
    SocialApiService,
    FacebookStrategy,
    LinkedinStrategy,
  ],
})
export class SocialApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticate('facebook', { 
        session: false, 
        scope: ['email', 'public_profile', 'user_photos'],
      }))
      .forRoutes('/facebook');
      
    consumer
      .apply(authenticate('linkedin', {
        session: false,
        state: 'true',
        scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social'],
      }))
      .forRoutes('/linkedin')
    }

}