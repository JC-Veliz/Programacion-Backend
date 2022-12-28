const { 
    agregarCarrito,
    borrarCarrito,
    todosProductosCarritos,
    agregarProductoCarrito,
    borrarCarritoProducto
    
}= require('../controllers/controllerCarritoFirebase.js')

const { Router } = require('express')
const routerCarritoFirebase = new Router()


routerCarritoFirebase.post("/", agregarCarrito);

routerCarritoFirebase.delete('/:id', borrarCarrito )

routerCarritoFirebase.get("/:id/productos", todosProductosCarritos );

routerCarritoFirebase.post("/:id/productos", agregarProductoCarrito);

routerCarritoFirebase.delete('/:id/productos/:id_prod',  borrarCarritoProducto)



module.exports = routerCarritoFirebase;