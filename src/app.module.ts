/**
 * @author: ntwari egide
 * @description: main application module
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OrderedProductsModule } from './ordered-products/ordered-products.module';
import { ProductModule } from './user/product.module';
@Module({
  imports: [ ProductModule,DatabaseModule, OrderedProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
