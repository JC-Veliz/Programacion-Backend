const {
    productosFaker
    
}= require('../controllers/controllerProductosFaker.js')


const { Router } = require('express')
const routerProductosFaker = new Router()



routerProductosFaker.get('/', productosFaker )

module.exports = routerProductosFaker;