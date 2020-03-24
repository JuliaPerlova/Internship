import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION1',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/users', { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
  },

  {
    provide: 'DATABASE_CONNECTION2',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/tokens', { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
  },
];