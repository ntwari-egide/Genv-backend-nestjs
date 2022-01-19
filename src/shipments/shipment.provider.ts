/**
 * @author: ntwari egide
 * @description: Shipment provider implementation
 */

 import { connection, Connection } from "mongoose";
import { ShipmentSchema } from "./entities/shipment.entity";
 
 export const orderProvider = [
     {
         provide: "SHIPMENT_MODEL",
         useFactory: (connnection: Connection) => connection.model("Shipments", ShipmentSchema),
         inject: ['DATABASE_CONNECTION']
     }
 ]