const ContenedorUsuarioMongoDB = require('../containers/containerUsuariosMongoDB')
const usuariosMongoDB = new ContenedorUsuarioMongoDB()
const {fork} = require('child_process')
const path = require('path')


// Rutas de registro //

const getRegistrar = async (req,res)=>{

    if (req.session.nombre) {
        res.redirect('/datos')
    }else{
        res.render('register')
    }    

}

// Rutas de login //


const getLogin= async(req,res)=>{    
    
   if (req.session.nombre) {
       res.redirect('/datos')
    }else{
                        
     res.render('login')

    }
}

const postLogin= async (req,res,next)=>{
    
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

    const nombre = req.session.nombre    

    const usuarios = await usuariosMongoDB.getAll1()     
    
    if(req.session.nombre){
           
        let user = await usuarios.find(usuario => usuario.nombre == nombre)    

        req.session.contador++
        res.render('datos', {
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

    req.logout(err => {
        res.redirect('/login')
    })

}


// Ruta raiz //


const getRaiz = async(req,res)=>{
    res.redirect('/datos')
}



const getInfo = (req,res) =>{
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


const api = (req,res) =>{

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



module.exports = {
    
    getRegistrar,    
    getLogin,
    postLogin,
    getDatos,
    getLogout,
    getRaiz,
    api,
    getInfo  
    
};