import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { SocialApiController } from './social-api.controller';
import { SocialApiService } from './social-api.service';
import { authenticate } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'facebook' })],
  controllers: [SocialApiController],
  providers: [SocialApiService, FacebookStrategy],
})
export class SocialApiModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticate('facebook', { 
        failureRedirect: '/login', 
        scope: ['email', 'public_profile', 'user_photos'],
      }))
      .forRoutes('/facebook');
  }
}