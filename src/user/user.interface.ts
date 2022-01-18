/**
 * @author: ntwari egide
 * @description: User interface implementation
 */


import { Document } from 'mongoose';

export interface User extends Document {
    id: Number,

    role: Number,
  
    email: String,
  
    username: String,
  
    password: String,
  
    joinedAt: Date,
  
    updatedAt: Date
}