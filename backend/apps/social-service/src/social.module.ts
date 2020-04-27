import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { DatabaseModule } from '../../shared/database/src/database.module';
import { socialProviders } from './social.providers';
import { UserModule } from '../../user-service/src/user.module';
import { LinkedinApiModule } from './linkedin-api/linkedin-api.module';

@Module({
  imports: [DatabaseModule, UserModule, LinkedinApiModule],
  controllers: [SocialController],
  providers: [
    SocialService, 
    ...socialProviders,
  ],
  exports: [SocialService],
})
export class SocialModule {}
