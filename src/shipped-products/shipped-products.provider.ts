/**
 * @author: ntwari egide
 * @description: shipped product provider implementation
 */

 import { Connection } from "mongoose";
import { ShippedProductSchema } from "./entities/shipped-product.entity";
 
 
 export const storedProductProvider = [
     {
         provide: "SHIPPED_PRODUCT_MODEL",
         useFactory: (connection: Connection) => connection.model("Shipped-product", ShippedProductSchema),
         inject: ['DATABASE_CONNECTION']
     }
 ]