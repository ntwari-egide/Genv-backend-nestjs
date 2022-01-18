/**
 * @author: ntwari egide
 * @description: main application module
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/product.module';
import { OrderedProductsModule } from './ordered-products/ordered-products.module';
@Module({
  imports: [ UserModule,DatabaseModule, OrderedProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
