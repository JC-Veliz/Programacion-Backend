const { 
    agregarCarrito,
    borrarCarrito,
    todosProductosCarritos,
    agregarProductoCarrito,
    borrarCarritoProducto
    
}= require('../controllers/controllerCarrito')

const { Router } = require('express')
const routerCarrito = new Router()

routerCarrito.post("/", agregarCarrito);

routerCarrito.delete('/:id', borrarCarrito )

routerCarrito.get("/:id/productos", todosProductosCarritos );

routerCarrito.post("/:id/productos", agregarProductoCarrito);

routerCarrito.delete('/:id/productos/:id_prod',  borrarCarritoProducto)



module.exports = routerCarrito;