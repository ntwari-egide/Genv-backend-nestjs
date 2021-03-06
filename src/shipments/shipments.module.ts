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
import { StoredProductsService } from 'src/stored-products/stored-products.service';
import { storedProductProvider } from 'src/stored-products/stored-products.provider';

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
    OrdersService,
    ShipmentsService,
    ShippedProductsService,
    ProductService,
    OrderedProductsService,
    StoredProductsService,
    ...orderProvider,
    ...shipmentProvider,
    ...shippedProductProvider,
    ...productsProvider,
    ...orderedProductProvider,
    ...storedProductProvider  ]
})
export class ShipmentsModule {}
