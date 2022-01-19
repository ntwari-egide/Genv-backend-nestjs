/**
 * @author: ntwari egide
 * @description: stored product provider implementation
 */

 import { Connection } from "mongoose";
import { StoredProductSchema } from "./entities/stored-product.entity";
 
 
 export const storedProductProvider = [
     {
         provide: "STORED_PRODUCT_MODEL",
         useFactory: (connection: Connection) => connection.model("Stored-product", StoredProductSchema),
         inject: ['DATABASE_CONNECTION']
     }
 ]