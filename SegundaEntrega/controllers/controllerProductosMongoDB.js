const ContenedorProductoMongoDB = require('../containers/containerProductoMongoDB');
const mongoose = require('mongoose');
const productosMongoDB = new ContenedorProductoMongoDB()



const todosProductosId = async (req, res) => {
    const num = req.params.id    
    
    if(num === undefined){
        return res.json(await productosMongoDB.getAll())
    }
    else{ res.json(await productosMongoDB.getById(num) ) }
}

const agregarProducto = async (req, res) => {    
    
   const producto = req.body
    
   const objeto = await productosMongoDB.save(producto)
    
    res.json( {ProductoAgregado: objeto})


}

const actualizarProducto = async (req, res) => {


    const id = req.params.id

    console.log(id)
       
    const producto = req.body

    const productoModificar = await productosMongoDB.getById(id) 

    const productoActualizado = await productosMongoDB.updateById(id, producto)

    res.json({ProductoAnterior: productoModificar,
              ProductoModificado: productoActualizado
    
    })

}

const borrarProductoId = async (req, res) => {
    
    const ID = req.params.id    

    const resultado = await productosMongoDB.getById(ID)

    if (resultado == null){
        res.json({ error: "El Producto con es ID no existe o ya fue eliminado"})
    }else {
        const objeto = await productosMongoDB.deleteById(ID)
        res.json( { ProductoEliminado: objeto})
    }


}


module.exports = { todosProductosId, agregarProducto, actualizarProducto,borrarProductoId}