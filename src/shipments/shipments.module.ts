/**
 * @author: ntwari egide
 * @description: shipment module implementation
 */

import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { ShippedProductsService } from 'src/shipped-products/shipped-products.service';
import { OrdersService } from 'src/orders/orders.service';
import { shippedProductProvider } from 'src/shipped-products/shipped-products.provider';
import { shipmentProvider } from './shipment.provider';
import { orderProvider } from 'src/orders/orders.provider';
import { ProductService } from 'src/product/product.service';
import { productsProvider } from 'src/product/product.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { OrderedProductsService } from 'src/ordered-products/ordered-products.service';
import { orderedProductProvider } from 'src/ordered-products/ordered-products.provider';
import { StoredProductsModule } from 'src/stored-products/stored-products.module';
import { StoredProductsService } from 'src/stored-products/stored-products.service';
import { storedProductProvider } from 'src/stored-products/stored-products.provider';
import { ProductModule } from 'src/product/product.module';
import { OrderedProductsModule } from 'src/ordered-products/ordered-products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ShippedProductsModule } from 'src/shipped-products/shipped-products.module';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 300
    })
  ],
  controllers: [ShipmentsController],
  providers: [
    ShipmentsService,
    ShippedProductsService,
    OrdersService,
    ProductService,
    OrderedProductsService,
    StoredProductsService,
    ...shippedProductProvider,
    ...shipmentProvider,
    ...orderProvider,
    ...productsProvider,
    ...orderedProductProvider,
    ...storedProductProvider
  ]
})
export class ShipmentsModule {}
