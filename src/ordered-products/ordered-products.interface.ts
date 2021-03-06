/**
 *  @author: ntwari egide
* @description: ordered product interface implementation
*/


import { Document } from 'mongoose';
import { Product } from 'src/product/product.interface';

export interface OrderedProduct extends Document {
   product: Product,

   quantity: number,

   isShipped: Boolean,

   orderedAt: Date

}