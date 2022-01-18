/**
 * @author: ntwari egide
 * @description: order provider implementation
 */

import { connection, Connection } from "mongoose";
import { OrderSchema } from "./entities/order.entity";

export const orderProvider = [
    {
        provide: "ORDER_MODEL",
        useFactory: (connnection: Connection) => connection.model("Order", OrderSchema),
        inject: ['DATABASE_CONNECTION']
    }
]