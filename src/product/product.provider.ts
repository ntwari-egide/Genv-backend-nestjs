/**
 * @author: ntwari egide
 * @description: Product provider implementation
 */

import { Connection } from "mongoose";
import { ProductSchema } from "./entities/product.entity";

 export const productsProvider = [
    {
      provide: 'PRODUCT_MODEL',
      useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ];
