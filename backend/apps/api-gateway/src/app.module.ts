import { Module } from '@nestjs/common';

import { UserApiModule } from './user-api/user-api.module';
import { AuthApiModule } from './auth-api/auth-api.module';
import { TokenModule } from '../../token-service/src/token.module';

@Module({
  imports: [UserApiModule, AuthApiModule, TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
