import { Module } from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';
import { OrderedProductsController } from './ordered-products.controller';

@Module({
  controllers: [OrderedProductsController],
  providers: [OrderedProductsService]
})
export class OrderedProductsModule {}
