//File System

const { option } = require('./options/mysqlconn.js')
const { options } = require('./options/SQLite3.js')
const usuario = require("./contenedor/sqlContainer.js")
const usuario1 = require("./contenedor/sqlContainer.js")
const knex = require('knex')(option,options)
// const knex1 = require('knex')(options)

//Modulo Class contenedor.js
const prod = new usuario.ClienteSQL(option)
const mensajes = new usuario1.ClienteSQL(options)

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

    
    res.render("index")   
    
    
})


io.on('connection', async (socket) =>{
    console.log('Un cliente se ha conectado')

    await knex.from('productos').select('*')
    //como es un select nos va a traer informacion, en este caso las filas.
    //FIlas: ROWS
    .then(rows => {
        //recorremos las filas
        const lista = []
        for (row of rows){
            
            lista.push({
                titulo: row.titulo,
                descripcion: row.descripcion,
                codigo: row.codigo,                
                precio: row.precio,
                foto: row.foto,
                stock: row.stock,
                id: row.id
            })
        }        

        socket.emit('productos', lista)


        socket.on('new-product', async (data) => {
            
            let productos = [data] 
        
            if(data.titulo && data.descripcion && data.codigo && data.precio && data.foto && data.stock){
                                      
                await prod.insertarArticulos(productos)            

                console.log('Articulos Almacenados')
                
                const producto = await prod.listarArticulos()


                io.sockets.emit('productos', producto)       
        
            }
            else{console.log('Faltan completar campos')}           
           
        })
    }) 
      
    // await mensajes.crearTablaMensajes()
    //     .then(()=>{

           
    //         const historial = [
    //                 {nombre: "Juan-Cruz@gmail.com", fyh: "28/11/2022, 0:39:37", mensaje: "Hola!"},
    //                 {nombre: "PedroP9@gmail.com", fyh: "28/11/2022, 0:40:37",mensaje: "Hola,como estas?!"}
    //             ]      
                
    //         return mensajes.insertarMensajes(historial)

            
    //     })
    await mensajes.listarMensajes()        
        .then((historia)=>{
            
            socket.emit('mensajes', historia)  
            socket.on('new-msj',  (message) =>{
                
                return mensajes.insertarMensajes(message)
                .then(()=>{
                    return mensajes.listarMensajes()
                })
                .then((mensajes)=>{
                    io.sockets.emit('mensajes', mensajes)

                })
                                                                
                
            })          

        })
    .catch(err =>console.log(err))
         

})


httpServer.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`))