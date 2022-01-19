/**
*  @author: ntwari egide
*  @description: shipment interface implementation
*/

import { Document } from 'mongoose';
import { Order } from 'src/orders/orders.interface';
import { ShippedProduct } from 'src/shipped-products/shipped-products.interface';

export interface Shipment extends Document {
    shipmentId: String,

    order: Order,

    shippedProduct: ShippedProduct[]

}