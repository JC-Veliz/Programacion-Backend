const mongoose = require('mongoose')

const collectionUsuarios = 'usuarios'

const schemaUsuarios = new mongoose.Schema({

    nombre: String,
    password: String,
    direccion: String,
    edad: Number,
    telefono: Number,
    email: String,
    avatar: String,

})

const modelU = mongoose.model( collectionUsuarios, schemaUsuarios )

module.exports = {modelU}