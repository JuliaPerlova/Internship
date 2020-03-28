import { Connection } from 'mongoose';
import { AttachmentSchema } from '../schemas/attachment.schema';

export const postsProviders = [
  {
    provide: 'ATTACH_MODEL',
    useFactory: (connection: Connection) => connection.model('Attachment', AttachmentSchema),
    inject: ['DATABASE_CONNECTION4'],
  },
]