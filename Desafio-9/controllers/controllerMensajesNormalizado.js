const ContenedorProductoMongoDB = require('../containers/containerMensajesMongoDB');
const ContenedorMensajesNormalizados = require('../containers/containerMensajesNormalizados');
const mongoose = require('mongoose');
const {normalize, schema, denormalize} = require ('normalizr')
const mensajesMongoDB = new ContenedorProductoMongoDB()
const mensajesNormalizados = new ContenedorMensajesNormalizados()



const normalizarMensajes = async (req, res) => {

    const todosMensajes = await mensajesMongoDB.getAll1()
    
    const stringifyData = JSON.stringify(todosMensajes)
    const parseData = JSON.parse(stringifyData)

    
       
    const m = await mensajesNormalizados.normalizeMessages(parseData)    
    

    res.json(m)
}
module.exports = { normalizarMensajes}