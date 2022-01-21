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
import { StoredProductsService } from 'src/stored-products/stored-products.service';
import { storedProductProvider } from 'src/stored-products/stored-products.provider';
import { ShippedProductsService } from 'src/shipped-products/shipped-products.service';
import { shippedProductProvider } from 'src/shipped-products/shipped-products.provider';
import { ShipmentsService } from 'src/shipments/shipments.service';
import { shipmentProvider } from 'src/shipments/shipment.provider';

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
    StoredProductsService,
    ShippedProductsService,
    ShipmentsService,
    ...shipmentProvider,
    ...orderProvider,
    ...orderedProductProvider,
    ...productsProvider,
    ...storedProductProvider,
    ...shippedProductProvider
  ]
})
export class OrdersModule {}
