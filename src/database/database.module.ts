/**
 * @author: ntwari egide
 * @description: database module configuration file
 */

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}