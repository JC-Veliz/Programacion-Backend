const { faker } = require('@faker-js/faker');
faker.locale = 'es'
const util = require ('util')


//Modulo Class contenedor.jsç

const ContenedorProductoMongoDB = require('./containers/containerMensajesMongoDB')
const mensajesMongoDB = new ContenedorProductoMongoDB()

//SERVIDOR
const express = require('express')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")
const { ingresar, productos } = require('./routers/routers');

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology:true}


app.use(express.static("./public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine','ejs')

app.use(cookieParser())
app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://coderhouse:coderhouse@juan.cqacvqt.mongodb.net/ecommerce?retryWrites=true&w=majority",
    mongoOptions: advancedOptions
  }),
  secret: "coderhouse",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {maxAge: 60000}
}))

app.use('/ingresar', ingresar)
app.use('/productos', productos);

app.get('/', async(req,res) =>{
    res.render("ingresar")
})

app.get('/test', async(req,res) =>{
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
        
        if(message.author.email && message.author.nombre && message.author.apellido && message.author.edad && message.author.alias && message.author.avatar
            && message.text){
                await mensajesMongoDB.save(message)

        let todosmensajes = await mensajesMongoDB.getAll()

        const stringifyData = JSON.stringify(todosmensajes)
        const parseData = JSON.parse(stringifyData)

        const normalizado = await mensajesMongoDB.normalizeMessages(parseData)


        io.sockets.emit('mensajes', normalizado)

        }else{
            console.log('Faltan completar campos')
        }             

    }) 

    let productos = await mensajesMongoDB.getAllProductos()
    
   
    socket.emit('productos', productos)
    
    socket.on('new-product', async (data) => {
            
         let todosProductos = data
    
        if(data.titulo && data.descripcion && data.codigo && data.precio && data.foto && data.stock){
                                  
            await mensajesMongoDB.saveProductos(todosProductos)            

            console.log('Articulos Almacenados')
            
            const productos = await mensajesMongoDB.getAllProductos()

            io.sockets.emit('productos', productos)       
    
        }
        else{console.log('Faltan completar campos')}           
       
    })   
    

    let productosFaker = []

    for (let i = 0; i < 5; i++) {
        productosFaker.push(await mensajesMongoDB.crearProducto(i+1))
    }       

    socket.emit('faker', productosFaker)

})

httpServer.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`))