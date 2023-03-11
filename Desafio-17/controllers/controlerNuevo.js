const ContenedorUsuarioMongoDB = require('../containers/containerUsuariosMongoDB')
const ContenedorCarritosMongoDB = require('../containers/containerCarritoMongoDB')
const carrito = new ContenedorCarritosMongoDB()
const usuariosMongoDB = new ContenedorUsuarioMongoDB()
const {fork} = require('child_process')
const  {loggerC, loggerW ,loggerE}  = require('../logger.js')
const accountSid = 'ACb7fe0f2995aaf4260e62d625bbe9941c';
const authToken = 'f402732bf83fb92c27d2f690e8207705';
const client = require('twilio')(accountSid, authToken);
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");

//-----------------------------NODEMAILER--------------------------//
const VARIABLE_GLOBAL_ALL_MAILS = [];

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'susie53@ethereal.email',
        pass: 'bMFwZuqeU3X4cDPN2v'
    }
});


// Rutas Carritos //


// Comparar carrito
const comprarCarrito = async (req,res) =>{

    const idCarro = req.body.id
    const usuario = req.body.nombre
    const carritoPorId = await carrito.carritoPorId(idCarro)

    const usuarioEncontrado = await usuariosMongoDB.getAll(usuario)
    

    if(usuarioEncontrado){

        // Enviamos un Wathapp con su pedido
        client.messages
        .create({
        body: `Nuevo Pedido de ${usuarioEncontrado.nombre}, email: ${usuarioEncontrado.email} productos que compro: ${carritoPorId.productos}`,
        from: 'whatsapp:+14155238886',
        to: "whatsapp:"+usuarioEncontrado.telefono
        })
        .then(message => console.log(message.sid))



        // Enviamos el mail con su pedido
        const mailOptions = {
            from: 'No-Replay <susie53@ethereal.email>',
            to: 'Dear Developer <susie53@ethereal.email>',
            subject: `Nuevo Pedido de ${usuarioEncontrado.nombre}, email: ${usuarioEncontrado.email} `,
            text: `productos: ${carritoPorId.productos}`,
            html: `
            <h1 style="color: #5e9ca0;">Bienvenido ${usuarioEncontrado.nombre}!</h1>
            <p>Gracias por su compra.</p>
            <p>Saludos, Tienda Online</p>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error al enviar el mail:', err);
                return;
            }
            console.log('Email enviado:', info.messageId);
            console.log('URL del email:', nodemailer.getTestMessageUrl(info));
            //guardar en variable global el email de prueba
            VARIABLE_GLOBAL_ALL_MAILS.push(nodemailer.getTestMessageUrl(info));
            console.log('VARIABLE_GLOBAL_ALL_MAILS', VARIABLE_GLOBAL_ALL_MAILS)
        });
        
        res.json('Mensajes enviados')
    }
    else{
        console.log(error)   
    }


}

// Agregar Carrito
const addCarrito = async (req,res) =>{

    const carritoAgregado = await carrito.agregarCarrito()
    
    res.json(carritoAgregado)
}

// Ver Carritos

const getCarts = async (req,res) =>{

    const carritos = await carrito.todosLosCarritos()

    res.json(carritos)
}
// Ver carrito por id

const getCartsId = async (req,res) =>{

    const id = req.params.id

    const carritoPorId = await carrito.carritoPorId(id)

    res.json(carritoPorId)
}

// Agregar Producto al carrito
const addProductCart = async (req,res) =>{

    const id = req.body.id
    const newProduct = req.body.productos
   
    const productAdd = await carrito.agregarProductoCarrito(id,newProduct)

    res.json(productAdd)
}

// Todos los Productos del carrito
const getProductCart = async (req,res) =>{
    const id = req.body.id

    const getAllProduct = await carrito.todosProductosCarrito(id)

    res.json(getAllProduct)
}

// Borrar un producto del carrito
const deleteProductCart = async (req,res) =>{

    const idCarrito = req.body.idCart
    const idProducto = req.body.idProduct

    const newCart = await carrito.borrarProductoPorId(idCarrito,idProducto)

    res.json(newCart)
}

// Borrar el carrito
const deleteCart = async (req,res) =>{

    const idCarrito = req.body.idCart

    const deleteCart = await carrito.borrarCarritoId(idCarrito)

    res.json(deleteCart)
}
///////////////////////////////////////////////////////////////////////////////////

// Rutas de registro //

const getRegistrar = async (req,res)=>{

    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)

    if (req.session.nombre) {
        res.redirect('/datos')
    }else{
        res.render('register')
    }    

}

// Rutas de login //


const getLogin= async(req,res)=>{
    
    
   if (req.session.nombre) {
    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)  
       res.redirect('/datos')
    }else{
                        
     res.render('login')

    }
}

const postLogin= async (req,res,next)=>{
    const {url, method} = req 
    //loggerC.info(`Metodo: ${method}, Ruta: ${url} `)
    
    if(req.user == undefined)
    {
       return next()
    }    

    req.session.nombre = req.user.nombre
    req.session.contador = 0
       
    next()
}


// Rutas de datos //

const getDatos = async(req,res) => {
    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)

    const nombre = req.session.nombre
        
    

    const usuarios = await usuariosMongoDB.getAll1()     
    
    if(req.session.nombre){
           
        let user = await usuarios.find(usuario => usuario.nombre == nombre)
        
        console.log(user)

        req.session.contador++
        res.render('datos', {
            datos: user.nombre,
            direccion: user.direccion,
            contador: req.session.contador,
            avatar: user.avatar
        })
    }else{
        req.session.destroy()

        res.redirect('/')
    } 
}
//Ruta Productos
const getProductos = async(req,res) => {
    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)

    const nombre = req.session.nombre    

    const usuarios = await usuariosMongoDB.getAll1()     
    
    if(req.session.nombre){
           
        let user = await usuarios.find(usuario => usuario.nombre == nombre)    

        req.session.contador++
        res.render('listaProductos', {
            datos: user.nombre,
            direccion: user.direccion,
            contador: req.session.contador
        })
    }else{
        req.session.destroy()

        res.redirect('/login')
    } 
}

// Ruta Mensajeria
const getMensajes = async(req,res) => {
    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)

    const nombre = req.session.nombre    

    const usuarios = await usuariosMongoDB.getAll1()     
    
    if(req.session.nombre){
           
        let user = await usuarios.find(usuario => usuario.nombre == nombre)    

        req.session.contador++
        res.render('mensajeria', {
            datos: user.nombre,
            direccion: user.direccion,
            contador: req.session.contador
        })
    }else{
        req.session.destroy()

        res.redirect('/login')
    } 
}


// Ruta de logout //


const getLogout= async(req,res) =>{
    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)

    req.logout(err => {
        res.redirect('/')
    })

}


// Ruta raiz //


const getRaiz = async(req,res)=>{
    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)

    res.redirect('/datos')
}



const getInfo = (req,res) =>{

    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)


    const Argumentos = process.argv.slice(2);
    const Plataforma = process.platform;
    const Version = process.version;
    const Memoria = process.memoryUsage().rss;
    const Path = process.execPath;
    const Id = process.pid;
    const Carpeta = process.cwd();

    const datos = {
    Argumentos: Argumentos,
    Plataforma: `Sistema operativo ${Plataforma}`,
    Version: `Version de node ${Version}`,
    Memoria: `Memoria total usada ${Memoria}`,
    Path: `Path de ejecucion ${Path}`,
    Id: `Id del proceso actual de trabajo ${Id}`,
    Carpeta: `Carpeta actual del proyecto ${Carpeta}`,
    };

    res.json(datos)

}

const getInfoBloq = (req,res) =>{

    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)


    const Argumentos = process.argv.slice(2);
    const Plataforma = process.platform;
    const Version = process.version;
    const Memoria = process.memoryUsage().rss;
    const Path = process.execPath;
    const Id = process.pid;
    const Carpeta = process.cwd();

    const datos = {
    Argumentos: Argumentos,
    Plataforma: `Sistema operativo ${Plataforma}`,
    Version: `Version de node ${Version}`,
    Memoria: `Memoria total usada ${Memoria}`,
    Path: `Path de ejecucion ${Path}`,
    Id: `Id del proceso actual de trabajo ${Id}`,
    Carpeta: `Carpeta actual del proyecto ${Carpeta}`,
    };
    console.log(datos)

    res.json(datos)

}


const api = (req,res) =>{

    const {url, method} = req 
    loggerC.info(`Metodo: ${method}, Ruta: ${url} `)

    const cantidad = parseInt(req.params.cant) || 8000000;    

    const calculo = fork(path.resolve(process.cwd(), './middleware/calculo.js'));
    calculo.on('message', result => {
        if (result == 'listo') {
            calculo.send(cantidad);
        } else {
            res.json(result);
        };
    });
};



const getNoExist = (req,res)=>{
    
    const {url, method} = req 
    res.send(`Metodo: ${method}, Ruta: ${url} no implementada`)
    
    loggerW.warn(`Metodo: ${method}, Ruta: ${url} no implementada`)

}

module.exports = {
    
    getRegistrar,    
    getLogin,
    postLogin,
    getDatos,
    getLogout,
    getRaiz,
    api,    
    getInfo,
    getInfoBloq,
    getNoExist,
    getProductos,  
    getMensajes, 
    addCarrito,
    addProductCart,
    getProductCart,
    deleteProductCart,
    deleteCart,
    comprarCarrito,
    getCarts,
    getCartsId,
};