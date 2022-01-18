/**
 * @author: ntwari egide
 * @description: Ordered Product Schema modal implementation
 */


 import * as mongoose from 'mongoose';
import { ProductSchema } from 'src/product/entities/product.entity';

 export const OrderedProductSchema = new mongoose.Schema({
 
    product: ProductSchema,
 
    quantity: Number
 
 });