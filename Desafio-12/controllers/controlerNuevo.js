const ContenedorUsuarioMongoDB = require('../containers/containerUsuariosMongoDB')
const usuariosMongoDB = new ContenedorUsuarioMongoDB()


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



module.exports = {
    
    getRegistrar,    
    getLogin,
    postLogin,
    getDatos,
    getLogout,
    getRaiz  
    
};