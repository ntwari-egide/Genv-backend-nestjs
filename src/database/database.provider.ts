import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://egide:12345@cluster0.9zsmg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
      ,
  },
];