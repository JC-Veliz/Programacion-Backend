import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productoSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  code: { type: String },
  image: { type: String },
  stock: { type: Number },
  timestamp: { type: String },
});

export const productos = mongoose.model("Producto", productoSchema);
