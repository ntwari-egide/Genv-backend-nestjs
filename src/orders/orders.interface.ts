/**
 *  @author: ntwari egide
* @description: orders interface implementation
*/

import { Document } from 'mongoose';
import { OrderedProduct } from 'src/ordered-products/ordered-products.interface';
import { Product } from 'src/product/product.interface';

export interface Order extends Document {
   orderId: String,

   orderedProducts: [OrderedProduct]

}