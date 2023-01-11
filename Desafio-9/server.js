//Configuracion del Servidor
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;


const routerMensajesMongoDB = require('./routes/routerMensajesMongoDB.js')
const routerMensajesNormalizado = require('./routes/routerMensajesNormalizados.js')
const routerProductosFaker = require('./routes/routerProductosFaker.js')


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/mensajes', routerMensajesMongoDB)

app.use('/api/mensajeNormalizado', routerMensajesNormalizado)

app.use('/api/faker',routerProductosFaker)

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});