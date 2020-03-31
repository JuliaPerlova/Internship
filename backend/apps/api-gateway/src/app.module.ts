import { Module } from '@nestjs/common';

import { UserApiModule } from './user-api/user-api.module';
import { AuthApiModule } from './auth-api/auth-api.module';

@Module({
  imports: [
    UserApiModule, 
    AuthApiModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
