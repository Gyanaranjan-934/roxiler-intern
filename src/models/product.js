// models/product.js

import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

export const Product = mongoose.model('Product', productSchema);