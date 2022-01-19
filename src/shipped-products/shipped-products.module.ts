import { Module } from '@nestjs/common';
import { ShippedProductsService } from './shipped-products.service';
import { ShippedProductsController } from './shipped-products.controller';

@Module({
  controllers: [ShippedProductsController],
  providers: [ShippedProductsService]
})
export class ShippedProductsModule {}
