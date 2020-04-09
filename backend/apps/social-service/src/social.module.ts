import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { DatabaseModule } from '../../shared/database/src/database.module';
import { socialProviders } from './social.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SocialController],
  providers: [
    SocialService, 
    ...socialProviders,
  ],
})
export class SocialModule {}
