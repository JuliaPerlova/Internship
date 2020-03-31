import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../shared/database/src/database.module';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postsProviders } from './post.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [
    PostService,
    ...postsProviders,
  ],
  exports: [PostService],
})
export class AppModule {}
