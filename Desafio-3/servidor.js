const fs = require('fs');
const modulo = require('./productos/contenedor.js')
const ruta = './productos/productos.txt';
let productos = new modulo.Contenedor(ruta)
const express = require('express');
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
    res.send('<h1>"SERVIDOR ACTIVO - Veliz Juan Cruz"</h1>');
});

app.get("/productos", async (req, res) => {
    
        lectura2 = await productos.getAll()       

    res.send(lectura2)

    
});

app.get("/productoRandom", async (req, res) => {
    
    let allProductos 
    let ids = []   
       
    allProductos = await productos.getAll()
    //recorre el array y guarda todos los id en el array ids
    for(let i=0; i < allProductos.length; i++){
        ids.push(allProductos[i].id)

    }     
    
    const numeroRandom = Math.floor(Math.random() * (ids.length - 1 + 1)) + 1 
        
    let prodAleatorio = productos.getById(numeroRandom)    
    
    res.send(await prodAleatorio)


});

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${PORT}`)
})