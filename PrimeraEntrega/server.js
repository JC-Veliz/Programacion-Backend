//Configuracion del Servidor
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const routerProductos = require('./routes/routerProducto')
const routerCarrito = require('./routes/routerCarrito')


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)



const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});