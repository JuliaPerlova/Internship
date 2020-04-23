import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../shared/database/src/database.module';
import { TokenModule } from '../../token-service/src/token.module';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postsProviders } from './post.providers';

@Module({
  imports: [
    DatabaseModule,
    TokenModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    ...postsProviders,
  ],
  exports: [PostService],
})
export class PostModule {}
