/**
 * @author: ntwari egide
 * @description: Product Schema modal implementation
 */


import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({

  productId: String,

  productName: String,

  mass_g: Number,

  storedAt: Date

});