/**
 * @author: ntwari egide
 * @description: Product Schema modal implementation
 */


 import * as mongoose from 'mongoose';
import { ProductSchema } from 'src/user/entities/product.entity';

 export const OrderedProductSchema = new mongoose.Schema({
 
    product: ProductSchema,
 
    quality: Number
 
 });