/**
 * @author: ntwari egide
 * @description: stored Product Schema modal implementation
 */

 import * as mongoose from 'mongoose';
import { ProductSchema } from 'src/product/entities/product.entity';

 export const StoredProductSchema = new mongoose.Schema({
 
    product: ProductSchema,
 
    quantity: Number
 
 });