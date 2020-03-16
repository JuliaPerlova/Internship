import { Module } from '@nestjs/common';
import { UserServiceModule } from './user-service/user-service.module';

@Module({
  imports: [
    UserServiceModule,
  ],
})
export class AppModule {}
