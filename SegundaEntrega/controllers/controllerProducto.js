const fs = require('fs')
const Producto = require('../containers/containerProducto');

const productos = new Producto('./baseDatos/productos.txt')



const todosProductosId = async (req, res) => {
    const num = req.params.id
    
    if(num === undefined){
        return res.json(await productos.getAll())
    }
    else{ res.json(await productos.getById(num) ) }
}

const agregarProducto = async (req, res) => {    
    
    const { nombre,descripcion,codigo,precio,foto } = req.body
    
    const objeto = await productos.save(nombre,descripcion,parseInt(codigo),parseInt(precio),foto)
    
    res.json( {ProductoAgregado: objeto})


}

const actualizarProducto = async (req, res) => {
    const { id } = req.params
    const ID = parseInt(id)    
    const { nombre,descripcion,codigo,precio,foto,stock } = req.body

    const producto = await productos.getAll()

    const indice = producto.findIndex(producto => producto.id === ID)

    const productoAnterior = producto[indice]

    const resultado = producto.filter( function (producto) {
        return producto.id === ID
      })
    const resultado1 = (resultado.length > 0) ? resultado[0] : null

    producto[indice] = { 
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        precio: precio,
        foto: foto,
        stock,
        id: ID
    }
    if (isNaN(ID)){
        res.json({ error: "El parametro no es un numero"})

    }
    if (resultado1 == null){
        
        res.json({ error: "Producto no encontrado"})
    }
              
    else {res.json({ 
            ProductoAnterior: productoAnterior,
            ProductoModificado: producto[indice]
                    
        })

        let lectura = JSON.stringify(producto, null, 2)
        console.log(producto)

        fs.writeFileSync('./baseDatos/productos.txt', lectura)
    }

}

const borrarProductoId = async (req, res) => {    
    const { id } = req.params
    const ID = parseInt(id)

    const resultado = await productos.deleteById(ID)

    if (resultado == "No existe"){
        res.json({ error: "El Producto con es ID no existe"})
    }else {
        res.json( { ProductoEliminado: resultado[0]})
    }


}


module.exports = { todosProductosId, agregarProducto, actualizarProducto, borrarProductoId }