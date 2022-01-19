/**
*  @author: ntwari egide
*  @description: shipped product interface implementation
*/


import { Document } from 'mongoose';
import { Product } from 'src/product/product.interface';

export interface ShippedProduct extends Document {
   product: Product,

   quantity: Number

}