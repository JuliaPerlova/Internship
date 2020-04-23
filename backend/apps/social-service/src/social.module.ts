import { Module, HttpModule } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { DatabaseModule } from '../../shared/database/src/database.module';
import { socialProviders } from './social.providers';
import { UserModule } from '../../user-service/src/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule, 
    HttpModule,
  ],
  controllers: [SocialController],
  providers: [
    SocialService, 
    ...socialProviders,
  ],
  exports: [SocialService],
})
export class SocialModule {}
