/**
 * @author: ntwari egide
 * @description: shipped Product Schema modal implementation
 */

import * as mongoose from 'mongoose';
import { ProductSchema } from 'src/product/entities/product.entity';

 export const ShippedProductSchema = new mongoose.Schema({
 
    product: ProductSchema,
 
    quantity: Number
 
 });