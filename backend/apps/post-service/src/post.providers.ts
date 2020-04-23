import { Connection } from 'mongoose';
import { PostSchema } from './schemas/post.schema';
import { PostTemplateSchema } from './schemas/post-templates.schema';

export const postsProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) => connection.model('Post', PostSchema),
    inject: ['DATABASE_POST_CONNECTION'],
  },

  {
    provide: 'TEMPLATE_MODEL',
    useFactory: (connection: Connection) => connection.model('Template', PostTemplateSchema),
    inject: ['DATABASE_TEMPLATE_CONNECTION'],
  },

]