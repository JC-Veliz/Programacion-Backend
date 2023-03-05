const mongoose = require('mongoose');

const carritoCollection = "carritos";

const carritoSchema = new mongoose.Schema({

  productos:[
    {
      titulo: { type: String, require: true },
      descripcion: { type: String, require: true },
      codigo: { type: Number, require: true },
      precio: { type: Number, require: true },
      foto: { type: String, require: true },
      stock:{ type: Number, require: true },
      id: { type: Number},
      timestamp: { type: Date, required: true},
    }
  ],
  timestamp: { type: Date, required: true}
  
});

const modelC = mongoose.model(carritoCollection,carritoSchema)
module.exports = { modelC }