/**
 * @author: ntwari egide
 * @description: shipment Schema modal implementation
 */

 import * as mongoose from 'mongoose';
import { OrderSchema } from 'src/orders/entities/order.entity';
import { ShippedProductSchema } from 'src/shipped-products/entities/shipped-product.entity';

export const ShipmentSchema = new mongoose.Schema ({
    shipmentId: String,
    order: OrderSchema,
    shippedProduct: [ShippedProductSchema]
})
