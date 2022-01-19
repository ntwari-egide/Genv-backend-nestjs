/**
 * @author: ntwari egide
 * @description: shipped product module implementation
 */

import { Module } from '@nestjs/common';
import { ShippedProductsService } from './shipped-products.service';
import { ShippedProductsController } from './shipped-products.controller';
import { ProductService } from 'src/product/product.service';
import { shippedProductProvider } from './shipped-products.provider';
import { productsProvider } from 'src/product/product.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 300
    })
  ],
  controllers: [ShippedProductsController],
  providers: [
    ShippedProductsService,
    ProductService,
    ...shippedProductProvider,
    ...productsProvider
  ]
})
export class ShippedProductsModule {}
