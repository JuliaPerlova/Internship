import { Module } from '@nestjs/common';

import { PostApiController } from './post-api.controller';
import { PostApiService } from './post-api.service';

@Module({
  controllers: [PostApiController],
  providers: [PostApiService],
})
export class PostApiModule {}