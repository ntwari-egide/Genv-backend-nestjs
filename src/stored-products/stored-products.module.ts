/**
 * @author: ntwari egide
 * @description: stored product module implementation
 */

import { Module } from '@nestjs/common';
import { StoredProductsService } from './stored-products.service';
import { StoredProductsController } from './stored-products.controller';
import { storedProductProvider } from './stored-products.provider';
import { ProductService } from 'src/product/product.service';
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
  controllers: [StoredProductsController],
  providers: [
    StoredProductsService,
    ProductService,
    ...storedProductProvider,
    ...productsProvider
  ]
})
export class StoredProductsModule {}
