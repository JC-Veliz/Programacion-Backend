

const getUsuario = (req, res) => {
    const usuario = req.session.nombre    
    if (usuario === "" || usuario === undefined) {
        res.render("ingresar")
    }
    else{        
        res.render("index")
        
    }
}

const postUsuario = (req, res) => {
    const usuario = req.body.nombre
    req.session.nombre = usuario     
    const saludo = `Bienvenido ${usuario}`
    if(usuario === `` || usuario === undefined){        
        res.render("ingresar")
    }else{
        res.render("index", {saludo})
    }
        
    
}

const getSalir = (req, res) => {
    const usuario = req.session.nombre
    const saludo = `Hasta luego ${usuario}`
    
    if(usuario === `` || usuario === undefined){        
        res.render("ingresar")
    }else{
        req.session.destroy( err => {
            if (err){
              res.json({error: "algo hiciste mal", descripcion: err})
            } else {
                res.render("saludo", {saludo}) 
            }
        })
    }
}

module.exports = {
    
    getUsuario,
    postUsuario,
    getSalir,
   
    
};