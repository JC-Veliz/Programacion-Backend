import mongoose from 'mongoose'

const usuariosCollection = 'usuarios'

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    username: {type: String, require: true, max: 150},
    password: {type: String, require: true, max: 150},
    direccion: {type: String, require: true},
})

export const User = mongoose.model(usuariosCollection, usuarioSchema)