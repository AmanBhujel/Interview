const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  features: { type: [String], required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  designable: { type: Boolean, required: true },
  colors: { type: [String], required: true },
  fabric: { type: [String], required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
