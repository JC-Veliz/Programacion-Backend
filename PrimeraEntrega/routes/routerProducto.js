const { 
    todosProductosId,
    agregarProducto,
    actualizarProducto,
    borrarProductoId
    
}= require('../controllers/controllerProducto')

const authAdmin = require('../middleware/admin')

const { Router } = require('express')
const routerProductos = new Router()


routerProductos.get("/:id?", todosProductosId );

routerProductos.post("/",authAdmin, agregarProducto);

routerProductos.put("/:id",authAdmin, actualizarProducto)

routerProductos.delete('/:id',authAdmin, borrarProductoId )

module.exports = routerProductos;