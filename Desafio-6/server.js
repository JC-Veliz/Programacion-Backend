//File System
const fs = require('fs')

//Modulo Class contenedor.js
const modulo = require('./contenedor/contenedor.js')
const ruta = './contenedor/productos.txt'
const ruta1 = './contenedor/mensajes.txt'
const productos = new modulo.Contenedor(ruta)
const mensajes = new modulo.Contenedor(ruta1)

//SERVIDOR
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080

app.use(express.static("./public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine','ejs')



app.get('/', async (req, res) => {

    
    const producto = await productos.getAll()
    const mensaje = await mensajes.getAll()
  
    res.render("index", {addp: producto,mensajes: mensaje})
})


io.on('connection', async (socket) =>{
    console.log('Un cliente se ha conectado')
      
    const historialMensajes = await mensajes.getAll()   
    const historialProductos = await productos.getAll()    
    
    socket.emit('mensajes', historialMensajes)
    socket.emit('productos', historialProductos)

    //--MENSAJERIA-CHAT
    /*--Recibe datos captados en los input que envia el cliente, valida los datos,
        los guarda en archivo txt y emite a todos los usuarios los nuevos datos--*/
    socket.on('new-msj', async (data) =>{        
        
        if(data.email && data.text){
            await mensajes.saveMsj(data.email,data.text)

            const mensaje = await mensajes.getAll()

            io.sockets.emit('mensajes', mensaje)

        }
        
    })

    //--PRODUCTOS-HISTORIAL
    /*--Recibe datos captados en los input que envia el cliente, valida los datos,
        los guarda en archivo txt y emite a todos los usuarios los nuevos datos--*/
    socket.on('new-product', async (data) => {
        
        if(data.titulo && data.price && data.thumbnail){
        
        await productos.save(data.titulo,data.price,data.thumbnail)

        const producto = await productos.getAll()

        io.sockets.emit('productos', producto)
        }

    })
})


httpServer.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`))