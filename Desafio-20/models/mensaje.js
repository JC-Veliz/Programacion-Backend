import mongoose from 'mongoose'

const mensajesCollection = 'mensajes'

const Schema = mongoose.Schema

const mensajeSchema = new Schema({
    id: {type: String, require: true},
    author: {
        id: {type: String, require: true, max: 150},
        nombre: {type: String, require: true, max: 150},
        apellido: {type: String, require: true, max: 150},
        edad: {type: Number, require: true},
        alias: {type: String, require: true, max: 150},
        avatar: {type: String, require: true, max: 150},
    },
    fyh: {type: String, require: true},
    text: {type: String, require: true}
})

export const mensajes = mongoose.model(mensajesCollection, mensajeSchema)