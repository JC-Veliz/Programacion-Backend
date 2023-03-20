const { getData } = require('../services/operations.js')

const listarArticulos = async (req, res) => {
    const productos = await getData()
    res.render('inicio', { productos })
}

module.exports = { listarArticulos }