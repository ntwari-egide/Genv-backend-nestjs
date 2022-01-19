import { Module } from '@nestjs/common';
import { StoredProductsService } from './stored-products.service';
import { StoredProductsController } from './stored-products.controller';

@Module({
  controllers: [StoredProductsController],
  providers: [StoredProductsService]
})
export class StoredProductsModule {}
