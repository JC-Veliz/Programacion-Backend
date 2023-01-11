const { 
    todosMensajesId,
    agregarMensaje,
    actualizarMensaje,
    borrarMensajeId
    
}= require('../controllers/controllerMensajesMongoDB.js')

const authAdmin = require('../middleware/admin')

const { Router } = require('express')
const routerMensajesMongoDB = new Router()



routerMensajesMongoDB.get("/:id?", todosMensajesId );

routerMensajesMongoDB.post("/",authAdmin, agregarMensaje);

routerMensajesMongoDB.put("/:id",authAdmin, actualizarMensaje)

routerMensajesMongoDB.delete('/:id',authAdmin, borrarMensajeId)




module.exports = routerMensajesMongoDB;