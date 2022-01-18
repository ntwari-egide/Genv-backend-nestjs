/**
 * @author: ntwari egide
 * @description: Product module implementation
 */


import { Module } from '@nestjs/common';
import { productsProvider } from './product.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';

  // protecting Denial of user attach by hackers - use throttler, limit 200 request in one minute

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot({
    ttl: 60,
    limit: 200,
  }),],
  controllers: [ProductsController],
  providers: [
    ProductService,
    ...productsProvider
  ]
})
export class ProductModule {}
