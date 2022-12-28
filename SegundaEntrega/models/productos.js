const mongoose = require('mongoose');

const productosCollection = "productos";

const productosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    precio: { type: Number, required: true },
    foto: { type: String, required: true },    
    stock: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

const model = mongoose.model(productosCollection, productosSchema)
module.exports = {model}