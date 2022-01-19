/**
 * @author: ntwari egide
 * @description: orders module implementation
 */

import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { OrderedProductsService } from 'src/ordered-products/ordered-products.service';
import { orderProvider } from './orders.provider';
import { orderedProductProvider } from 'src/ordered-products/ordered-products.provider';
import { ProductService } from 'src/product/product.service';
import { productsProvider } from 'src/product/product.provider';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 300
    })
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderedProductsService,
    ProductService,
    ...orderProvider,
    ...orderedProductProvider,
    ...productsProvider
  ]
})
export class OrdersModule {}
