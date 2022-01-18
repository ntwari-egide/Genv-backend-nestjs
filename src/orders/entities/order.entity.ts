/**
 * @author: ntwari egide
 * @description: Orders Schema modal implementation
 */

import * as mongoose from 'mongoose';
import { OrderedProductSchema } from 'src/ordered-products/entities/ordered-product.entity';


export const OrderSchema = new mongoose.Schema ({

    orderId: String,

    orderedProducts : [OrderedProductSchema]

})
