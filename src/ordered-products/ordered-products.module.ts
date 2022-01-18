/**
 * @author: ntwari egide
 * @description: ordered product module implementation
 */

import { Module } from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';
import { OrderedProductsController } from './ordered-products.controller';
import { orderedProductProvider } from './ordered-products.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
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
  controllers: [OrderedProductsController],
  providers: [
    OrderedProductsService,
    ProductService,
    ...orderedProductProvider,
    ...productsProvider
  ]
})
export class OrderedProductsModule {}
