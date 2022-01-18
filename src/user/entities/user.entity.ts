/**
 * @author: ntwari egide
 * @description: User modal implementation
 */


import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({

  username: String,

  password: String,

  joinedAt: Date,

  updatedAt: Date,

  verified: Boolean

});