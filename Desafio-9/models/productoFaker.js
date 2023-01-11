const mongoose = require('mongoose');

const collectionProductos = "productos"

const schemaProductos = new mongoose.Schema({
    timestamp: String,
    nombre: String,
    descripcion: String,
    codigo: String,
    precio: Number,
    foto: String,
    stock: Number,
})

const models = mongoose.model(collectionProductos, schemaProductos)

module.exports = models