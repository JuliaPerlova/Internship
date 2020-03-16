import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers'; 

@Module({
  imports: [DatabaseModule],
  controllers: [UserServiceController],
  providers: [
    UserServiceService,
    ...usersProviders,
  ]
})
export class UserServiceModule {}
