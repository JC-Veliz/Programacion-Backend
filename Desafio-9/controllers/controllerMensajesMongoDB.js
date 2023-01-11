const ContenedorProductoMongoDB = require('../containers/containerMensajesMongoDB');
const mongoose = require('mongoose');
const mensajesMongoDB = new ContenedorProductoMongoDB()
const {normalize, schema, denormalize} = require ('normalizr')



const todosMensajesId = async (req, res) => {
    const num = req.params.id    
    
    if(num === undefined){
        return res.json(await mensajesMongoDB.getAll())
    }
    else{ res.json(await mensajesMongoDB.getById(num) ) }
}

const agregarMensaje = async (req, res) => {
    
    const mensaje = await req.body     
    const todosMensajes = JSON.stringify(await mensajesMongoDB.getAll())

//     const mensajeNuevo = {
//         id: mensaje.id,
//         author: {
//             id: mensaje.author.id,
//             nombre: mensaje.author.nombre,
//             apellido: mensaje.author.apellido,
//             edad: mensaje.author.edad,
//             alias: mensaje.author.alias,
//             avatar: mensaje.author.avatar
//         },
//         text: mensaje.text,
//         timestamp: Date.now()

//    }
//    const objeto = await mensajesMongoDB.save(mensajeNuevo)

//    res.json( {MensajeAgregado: objeto})

    
    if(todosMensajes === "[]"){        
        const mensajeNuevo = {
            id: 1,
            author: {
                email: mensaje.author.email,
                nombre: mensaje.author.nombre,
                apellido: mensaje.author.apellido,
                edad: mensaje.author.edad,
                alias: mensaje.author.alias,
                avatar: mensaje.author.avatar
            },
            text: mensaje.text,
            timestamp: Date.now()
    
       }
       const objeto = await mensajesMongoDB.save(mensajeNuevo)
    
        res.json( {MensajeAgregado: objeto})

    }else {
        const todosMensajes = await mensajesMongoDB.getAll()

        console.log(todosMensajes[0])
        const ids = [];

        for(let i=0; i < todosMensajes.length; i++){
            ids.push(todosMensajes[i].id)}

            let objeto ={
                id: Math.max(...ids)+1,
                author: {
                    email: mensaje.author.email,
                    nombre: mensaje.author.nombre,
                    apellido: mensaje.author.apellido,
                    edad: mensaje.author.edad,
                    alias: mensaje.author.alias,
                    avatar: mensaje.author.avatar
                },
                text: mensaje.text,
                timestamp: Date.now()                             
            }

        const obj = await mensajesMongoDB.save(objeto)
    
        res.json( {MensajeAgregado: obj})

    }   


}

const actualizarMensaje = async (req, res) => {


    const id = req.params.id

    console.log(id)
       
    const mensaje = req.body

    const mensajeModificar = await mensajesMongoDB.getById(id) 

    const mensajeActualizado = await mensajesMongoDB.updateById(id, mensaje)

    res.json({ProductoAnterior: mensajeModificar,
              ProductoModificado: mensajeActualizado
    
    })

}

const borrarMensajeId = async (req, res) => {
    
    const ID = req.params.id    

    const resultado = await mensajesMongoDB.getById(ID)

    if (resultado == null){
        res.json({ error: "El Mensaje con es ID no existe o ya fue eliminado"})
    }else {
        const objeto = await mensajesMongoDB.deleteById(ID)
        res.json( { ProductoEliminado: objeto})
    }


}




module.exports = { todosMensajesId, agregarMensaje, actualizarMensaje,borrarMensajeId}