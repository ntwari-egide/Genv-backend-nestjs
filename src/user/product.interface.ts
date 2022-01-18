/**
 * @author: ntwari egide
 * @description: User interface implementation
 */


import { Document } from 'mongoose';

export interface Product extends Document {
    productId: String,

    productName: String,
  
    mass_g: Number,
  
    storedAt: Date
}