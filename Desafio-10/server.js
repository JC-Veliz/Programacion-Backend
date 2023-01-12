// const knex = require('knex')(option,options)
// const knex1 = require('knex')(options)
const {normalize, schema, denormalize} = require ('normalizr')
const { faker } = require('@faker-js/faker');
faker.locale = 'es'
const util = require ('util')


//Modulo Class contenedor.jsç


const ContenedorProductoMongoDB = require('./containers/containerMensajesMongoDB')
const mensajesMongoDB = new ContenedorProductoMongoDB()

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
app.get('/api/productos-test', async (req, res) => {

    
    res.render("productos")      
    
})

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
}


io.on("connection", async (socket)=>{

    const mensajes = await mensajesMongoDB.getAll()

    const stringifyData = JSON.stringify(mensajes)
    const parseData = JSON.parse(stringifyData)

    const normalizado = await mensajesMongoDB.normalizeMessages(parseData)
  

    socket.emit('mensajes', normalizado)
    

    socket.on('new-msj',  async (message) =>{

        await mensajesMongoDB.save(message)

        let todosmensajes = await mensajesMongoDB.getAll()

        const stringifyData = JSON.stringify(todosmensajes)
        const parseData = JSON.parse(stringifyData)

        const normalizado = await mensajesMongoDB.normalizeMessages(parseData)


        io.sockets.emit('mensajes', normalizado)

    })    

    let productos = []

    for (let i = 0; i < 5; i++) {
        productos.push(await mensajesMongoDB.crearProducto(i+1))
    }       

    socket.emit('faker', productos)

})

httpServer.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`))