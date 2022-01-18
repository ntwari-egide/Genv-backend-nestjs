/**
 * @author: ntwari egide
 * @description: product interface implementation
 */


import { Document } from 'mongoose';

export interface Product extends Document {
    productId: String,

    productName: String,
  
    mass_g: Number,
  
    storedAt: Date
}