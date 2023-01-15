const {  getUsuario, postUsuario , getSalir} = require('../controllers/controler');

const { Router } = require('express');

const ingresar = Router();
const productos = Router();

// productos.get('/:id?', getAll);

ingresar.get('/', getUsuario)
ingresar.post('/', postUsuario)

productos.get('/salir', getSalir)

module.exports = {ingresar, productos};