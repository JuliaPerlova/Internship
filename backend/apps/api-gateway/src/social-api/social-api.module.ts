import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { SocialApiController } from './social-api.controller';
import { SocialApiService } from './social-api.service';
import { authenticate } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { LinkedinStrategy } from './strategies/linkedin.strategy';

@Module({
  imports: [PassportModule.register({ 
    facebookStrategy: 'facebook',
    linkedinStrategy: 'linkedin',
  })],
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
        scope: ['r_liteprofile', 'r_emailaddress'],
      }))
      .forRoutes('/linkedin')
    }

}