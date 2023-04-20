//Class containerMensajesMongoDB.js
const ContenedorMensajesMongoDB = require('./containers/containerMensajesMongoDB')
const mensajesMongoDB = new ContenedorMensajesMongoDB()
const ContenedorProductosMongoDB = require('./containers/containerProductosMongoDB')
const productosMongoDB = new ContenedorProductosMongoDB()

//swagger
const swaggerUi = require('swagger-ui-express')
const { swaggerSpecs } = require('./swaggerSpecs')

// Logger
const  {loggerC, loggerW ,loggerE}  = require('./logger.js')
//SERVIDOR
const express = require('express')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")
const { registrar,login, datos, logout, raiz, info, apiRandom, noExiste, productos, mensajeria, carrito  } = require('./routers/routers');


const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const passport =require("passport")
const fileUpload = require('express-fileupload')
const path = require('path');



////////////////////////////////////////////////////////////////////
const parseArgs = require('minimist')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology:true}
const dotenv = require('dotenv')

dotenv.config();

const config= {
    alias: { p: 'PORT' },
    default: { PORT: 8080 },
}
const cluster =require ("cluster");
const { cpus } = require("os");

const args = parseArgs(process.argv.slice(2));

const SERVERMODE = process.argv[2] || "FORK";
const PORT  = args.port || 8080
const MONGO = process.env.MONGO
console.log(cpus().length);

///////////////////////////////////////////////////////////////////
if (SERVERMODE === "CLUSTER" && cluster.isPrimary) {
    console.log(`MAster ${process.pid} esta corriendo`);
  
    for (let index = 0; index < 7; index++) {
      cluster.fork();
  
      cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} termino`);
      });
    }
  } else {
    SERVER();
}

function SERVER() {    
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO,
        mongoOptions: advancedOptions
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: 60000}
}))

app.use(express.static("./public"))
app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));
app.use(fileUpload())


///////////////////////////////////////////
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.set('view engine','ejs')
////////////////////////////////////////
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {
    req.isAuthenticated = () => {
        if (req.session.nombre) {
            return true
        }
        return false
    }

    req.logout = callback => {
        req.session.destroy(callback)
    }

    next()
})

//SWAGGER
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))


app.get('/', async(req,res) =>{

    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)

    if (req.session.nombre) {
        res.redirect('/datos')
    }else{
        
        loggerE.error('Session Cerrada')
        res.render('inicio')

    }
})
app.get('/test', async(req,res) =>{
    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)
    res.render("productos")
})

app.use('/', registrar)
app.use('/', login)
app.use('/', productos)
app.use('/', mensajeria)
app.use('/', datos)
app.use('/', logout)
app.use('/', raiz)
app.use('/', info)

app.use('/',carrito)

app.use('/', apiRandom)
app.use('*', noExiste)






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
            loggerE.error('Faltan completar campos en la Mensajeria')
            
        }             

    }) 
//////////////////////////////////////////////////////////////////
    let productos = await productosMongoDB.getAllProductos()    
   
    socket.emit('productos', productos)

    
    
    socket.on('new-product', async (data) => {
            
         let todosProductos = data         
    
        if(data.titulo && data.descripcion && data.codigo && data.precio && data.foto && data.stock){
                                  
            await productosMongoDB.saveProductos(todosProductos)            

            loggerC.info('Articulos Almacenados')
            
            const productos = await productosMongoDB.getAllProductos()

            io.sockets.emit('productos', productos)       
    
        }
        else{
            loggerE.error('Faltan completar campos en Productos')
            
        }           
       
    })   
    
    socket.on('delete-producto', async (data) =>{
        const porductoEliminar = parseInt(data)
       
        await productosMongoDB.deleteProducto(porductoEliminar)
        
        const productos = await productosMongoDB.getAllProductos()

        io.sockets.emit('productos', productos) 

    })

//////////////////////////////////////////////////////////////////////
    let productosFaker = []

    for (let i = 0; i < 5; i++) {
        productosFaker.push(await productosMongoDB.crearProducto(i+1))
    }       

    socket.emit('faker', productosFaker)

})


httpServer.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`))
}
