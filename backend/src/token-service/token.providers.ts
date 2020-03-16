import { Connection } from 'mongoose';
import { UserTokenSchema } from './schemas/user-token.schema';

export const tokensProviders = [
  {
    provide: 'USERTOKEN_MODEL',
    useFactory: (connection: Connection) => connection.model('User', UserTokenSchema),
    inject: ['DATABASE_CONNECTION2'],
  },
]