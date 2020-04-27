import { Connection } from 'mongoose';
import { SocialSchema } from './schemas/social.schema';

export const socialProviders = [
  {
    provide: 'SOCIAL_MODEL',
    useFactory: (connection: Connection) => connection.model('Social', SocialSchema),
    inject: ['DATABASE_SOCIAL_CONNECTION'],
  },
]