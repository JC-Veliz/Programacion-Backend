const ContenedorUsuarioMongoDB = require('../containers/containerUsuariosMongoDB')
const LocalStrategy = require("passport-local").Strategy
const passport =require("passport")
const usuariosMongoDB = new ContenedorUsuarioMongoDB()
const bCrypt = require('bcrypt')
const { 
        getLogin,
        postLogin,
        getDatos,
        getLogout,
        getRaiz,
        api,
        getInfo   
} = require('../controllers/controlerNuevo')
const { Router } = require('express')
const registrar = Router()
const login = Router()
const datos = Router()
const logout = Router()
const raiz = Router()
const info = Router()
const apiRandom = Router()

//-----------------------------BCRYPT----------------------------------//
function createHash(password) {
    return bCrypt.hashSync( password, bCrypt.genSaltSync(10), null );
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}
//--------------------------------------------------------------------//


//----------------------------PASSPORT LOCAL--------------------------//

// Registro //

passport.use("register", new LocalStrategy({
    passReqToCallback: true,
}, async (req, username, password, done) => {

    const usuario = await usuariosMongoDB.getAll(username);
    const {  direccion } = req.body;       
    

    if (usuario) {
        
        return done(false);
    }

    const newUser = {
        nombre: username,
        password: createHash(password),
        direccion
    };

    const usuarioGuardado = await usuariosMongoDB.guardarUsuario(newUser);

    done(null, usuarioGuardado);
}));

// Login //
passport.use("login", new LocalStrategy(async (username, password, done) => {

    const usuario = await usuariosMongoDB.getAll(username);

    if (!usuario) {
        return done(false);
    };

    if (!isValidPassword(usuario, password)) {
        return done(false)
    };


    return done(null, usuario);
}));   

passport.serializeUser((user, done) => {
    
    done(null, user.nombre);
});

passport.deserializeUser(async (username, done) => {
    
    const usuario = await usuariosMongoDB.getAll(username);
    done(null, usuario);
});

//--------------------------------------------------------------------//

// Rutas Registro //
registrar.get("/register", (req,res)=>{    

    res.render('../views/register.ejs')
})
registrar.post("/register", passport.authenticate("register", { failureRedirect: '/failregister', successRedirect: "/login" } ))

registrar.get('/failregister', (req,res)=>{

    res.render('registe-error') 
       
})

// Rutas Loguin //
login.get("/login", getLogin)
login.post("/login", passport.authenticate("login",{ failureRedirect: '/faillogin', successRedirect: "/datos" }))
login.get('/faillogin', (req,res)=>{
    res.render('login-error')
})

// Ruta Datos //
datos.get('/datos',postLogin, getDatos)

// Ruta Logout //
logout.get('/logout', getLogout)

// Ruta Raiz //
raiz.get('/', getRaiz)


info.get('/info', getInfo)

apiRandom.get('/api/random/:cant?', api)

module.exports = { registrar,login,datos,logout,raiz, info, apiRandom};