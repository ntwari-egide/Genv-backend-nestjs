/**
 * @author: ntwari egide
 * @description: main application module
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OrderedProductsModule } from './ordered-products/ordered-products.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { StoredProductsModule } from './stored-products/stored-products.module';
import { ShippedProductsModule } from './shipped-products/shipped-products.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { ProductService } from './product/product.service';
import { productsProvider } from './product/product.provider';
@Module({
  imports: [ ProductModule,DatabaseModule, OrderedProductsModule, OrdersModule, StoredProductsModule, ShippedProductsModule, ShipmentsModule],
  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    ...productsProvider
  ],
})
export class AppModule {}
