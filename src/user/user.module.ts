/**
 * @author: ntwari egide
 * @description: User module implementation
 */


import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProvider } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';

  // protecting Denial of user attach by hackers - use throttler, limit 200 request in one minute

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot({
    ttl: 60,
    limit: 200,
  }),],
  controllers: [UserController],
  providers: [
    UserService,
    ...usersProvider
  ]
})
export class UserModule {}
