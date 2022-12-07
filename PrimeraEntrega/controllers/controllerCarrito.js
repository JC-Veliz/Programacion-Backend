const fs = require('fs');
const Carrito = require('../containers/containerCarrito');
const Producto = require('../containers/containerProducto');

const productos = new Producto('./baseDatos/productos.txt')
const carritos = new Carrito('./baseDatos/carrito.txt')


const agregarCarrito = async (req, res) => {    
    
    const { productos = [] } = req.body
    
    const objeto = await carritos.save(productos)
    
    res.json( {CarritoAgregado: `ID: ${objeto.id}`})
}

const borrarCarrito = async (req, res) => {    
    const { id } = req.params
    const ID = parseInt(id)

    const resultado = await carritos.deleteCarritoId(ID)

    console.log(resultado)

    if (resultado == "No existe"){
        res.json({ error: "El Carrito con es ID no existe"})
    }else {
        res.json( { CarritoEliminado: resultado})
    }


}

const todosProductosCarritos = async (req, res) => {
    const num = req.params.id
    
     res.json(await carritos.getById(num) ) 
}

const agregarProductoCarrito = async (req,res) =>{

    /*
        
        Leo el archivo productos.txt, elijo un producto, miro su id
        y en insomnia escribo un objeto con el id del producto que elegi:
        {
            "id": numero del producto 
        }      
    
    */
    
    const idProducto = parseInt(req.body.id);  
    const idCarrito = parseInt(req.params.id);
    
    let producto = await productos.getById(idProducto)    
    let carritoId = await carritos.getByIdCarrito(idCarrito)
    
    if(producto === "no hay productos con ese ID" || producto === undefined){
        return res.json(producto)
    }if(carritoId === "no hay Carrito con ese ID" || carritoId === undefined){
        return res.json(carritoId)
    }if(producto !== "no hay productos con ese ID" || producto !== undefined
        && carritoId !== "no hay productos con ese ID" || carritoId !== undefined )
    {
        const allCarrito = await carritos.getAll()        
        res.json(await carritos.posProductoCarrito(carritoId,idCarrito,allCarrito,producto))
    }
}

const borrarCarritoProducto = async (req,res) =>{
    const idProducto = req.params.id_prod;     
    const idCarrito = req.params.id;
    
    res.json(await carritos.deleteProductoById(idCarrito,idProducto))
       
    

}

module.exports = {
    agregarCarrito,
    borrarCarrito,
    todosProductosCarritos,
    agregarProductoCarrito,
    borrarCarritoProducto
}




