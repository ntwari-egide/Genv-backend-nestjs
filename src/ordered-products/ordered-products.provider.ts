/**
 * @author: ntwari egide
 * @description: ordered product provider implementation
 */

import { Connection } from "mongoose";
import { OrderedProductSchema } from "./entities/ordered-product.entity";


export const orderedProductProvider = [
    {
        provide: "ORDERED_PRODUCT_MODEL",
        useFactory: (connection: Connection) => connection.model("Ordered-product", OrderedProductSchema),
        inject: ['DATABASE_CONNECTION']
    }
]