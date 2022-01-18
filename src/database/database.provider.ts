/**
 * @author: ntwari egide
 * @description: database providers configuration file
 */

import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://upzyxwqieslgpatyvigu:DXOoe9zh3h0krC42MJKe@btrowphmh7ovzhg-mongodb.services.clever-cloud.com:27017/btrowphmh7ovzhg')
      ,
  },
];