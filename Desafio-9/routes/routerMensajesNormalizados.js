const {
    normalizarMensajes
    
}= require('../controllers/controllerMensajesNormalizado.js')


const { Router } = require('express')
const routerMensajesNormalizado = new Router()



routerMensajesNormalizado.get('/', normalizarMensajes )

module.exports = routerMensajesNormalizado;