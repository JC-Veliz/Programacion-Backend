const ContenedorProductosFaker = require('../containers/containerProductosFaker.js');
const producto = new ContenedorProductosFaker()


const productosFaker = async (req, res) => {

    let productos = []
    for (let i = 0; i < 5; i++) {
        productos.push(await producto.crearProducto(i+1))
    }  

    res.json(productos)
}
module.exports = { productosFaker}