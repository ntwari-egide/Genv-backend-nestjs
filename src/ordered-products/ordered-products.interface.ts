/* @author: ntwari egide
* @description: ordered product interface implementation
*/


import { Document } from 'mongoose';
import { Product } from 'src/user/product.interface';

export interface OrderedProduct extends Document {
   product: Product,

   quantity: Number

}