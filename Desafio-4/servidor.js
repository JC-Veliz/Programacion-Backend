// File System
const fs = require('fs');

//Modulo class Contenedor
const modulo = require('./productos/contenedor.js')
const ruta = './productos/productos.txt';
const productos = new modulo.Contenedor(ruta)

//Configuracion del Servidor
const express = require('express');
const { Router } = express
const app = express();
const PORT = 8080;
const routerProductos = new Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static',express.static('public'))
app.use('/api/productos', routerProductos)



routerProductos.get("/", async (req, res) => {
    res.json( await productos.getAll());
      
    
});

routerProductos.get("/:id", async (req, res) => {
    const num = req.params.id
    
    if (isNaN(num)){
        return res.json( { error: "El parametro no es un numero"} )
    }
    if (await productos.getById(num) === null){
        return res.json({ error: "producto no encontrado"}  )
    }
    else{res.json( await productos.getById(num)) }


});

routerProductos.post("/", async (req, res) => {    
    
    const { title,price, thumbnail } = req.body
    
    const objeto = await productos.save(title,parseInt(price),thumbnail)
    
    res.json( {ProductoAgregado: objeto})


});

routerProductos.put("/:id", async (req, res) => {
    const { id } = req.params
    const ID = parseInt(id)
    const { title,price,thumbnail } = req.body

    const allProductos = await productos.getAll()

    const indice = allProductos.findIndex(allProductos => allProductos.id === ID)

    const productoAnterior = allProductos[indice]

    const resultado = allProductos.filter( function (allProductos) {
        return allProductos.id === ID
      })
    const resultado1 = (resultado.length > 0) ? resultado[0] : null

    allProductos[indice] = { 
        title: title,
        price: price,
        thumbnail: thumbnail,
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
            ProductoModificado: allProductos[indice]
                    
        })

        let lectura = JSON.stringify(allProductos, null, 2)

        fs.writeFileSync(ruta, lectura)
    }

});

routerProductos.delete("/:id", async (req, res) => {    
    const { id } = req.params
    const ID = parseInt(id)

    const resultado = await productos.deleteById(ID)

    if (resultado == "No existe"){
        res.json({ error: "Producto no encontrado"})
    }else {
        res.json( { ProductoEliminado: resultado[0]})
    }


})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${PORT}`)
})