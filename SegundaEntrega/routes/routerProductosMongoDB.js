const { 
    todosProductosId,
    agregarProducto,
    actualizarProducto,
    borrarProductoId
    
}= require('../controllers/controllerProductosMongoDB.js')

const authAdmin = require('../middleware/admin')

const { Router } = require('express')
const routerProductosMongoDB = new Router()


routerProductosMongoDB.get("/:id?", todosProductosId );

routerProductosMongoDB.post("/",authAdmin, agregarProducto);

routerProductosMongoDB.put("/:id",authAdmin, actualizarProducto)

routerProductosMongoDB.delete('/:id',authAdmin, borrarProductoId )

module.exports = routerProductosMongoDB;