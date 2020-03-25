import * as mongoose from 'mongoose';
import 'dotenv/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION1',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
  },

  {
    provide: 'DATABASE_CONNECTION2',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
  },
];