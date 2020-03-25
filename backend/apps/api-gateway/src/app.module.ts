import { Module } from '@nestjs/common';

import { TokenModule } from '../../token-service/src/token.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
