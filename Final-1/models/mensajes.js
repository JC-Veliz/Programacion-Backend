const mongoose = require('mongoose');

const mensajeCollection = "mensajes";

const mensajeSchema = new mongoose.Schema({   

    author: {        
        email: { type: String, require: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type:String, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true},
    id: { type: Number, required: true },
});


const model = mongoose.model(mensajeCollection, mensajeSchema)
module.exports = {model}