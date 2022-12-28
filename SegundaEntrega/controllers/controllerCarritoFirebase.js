const fs = require('fs');
const Carrito = require('../containers/containerCarritoFirebase');
const Producto = require('../containers/containerProductoMongoDB');

const productos = new Producto()
const carritos = new Carrito()


const agregarCarrito = async (req, res) => {    
    
    const carrito = req.body
    
    const nuevoCarrito = await carritos.agregarCarrito(carrito)
    
    
    res.json( {CarritoAgregado: `ID: ${nuevoCarrito}`})
}

const borrarCarrito = async (req, res) => {    
    const { id } = req.params
    
    const carrito = await carritos.deleteCarritoId(id)

    

    if (carrito == "No existe"){
        res.json({ error: "El Carrito con es ID no existe"})
    }else {
        res.json( { CarritoEliminado: carrito})
    }


}

const todosProductosCarritos = async (req, res) => {
    const num = req.params.id
    const carrito = await carritos.getProductosCarrito(num)
     res.json(carrito) 
}

const agregarProductoCarrito = async (req,res) =>{

    const { id } = req.params
    const producto= req.body
    const nuevoProducto = await carritos.posProductoCarrito(id, producto)

    res.json(nuevoProducto)

    
}

const borrarCarritoProducto = async (req,res) =>{
    const { id, id_prod } = req.params;
    const producto = await persistenciaCarritoFirebase.deleteProductoCarrito(id, id_prod);
    res.json(producto)      
    

}

module.exports = {
    agregarCarrito,
    borrarCarrito,
    todosProductosCarritos,
    agregarProductoCarrito,
    borrarCarritoProducto
}

