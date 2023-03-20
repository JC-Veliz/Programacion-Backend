const { Router } = require('express')
const { listarArticulos } = require('../controllers/operations.js')
const { getData, insertData, getMessages, insertMessage } = require('../services/operations.js')

const home = Router()

// socket io export into a function 

const socketMessaje = async (io) => {
    io.on('connection', async socket => {
        console.log('Un cliente se ha conectado')

        //guardar mensajes en la base de datos y mostrarlos con sqlite3
        socket.emit('messages', await getMessages())
        socket.on('new-message', async data => {

            await insertMessage(data)

            const mensajes = await getMessages()

            io.sockets.emit('messages', mensajes)

        })
    })
}

const socketProduct = async (io) => {
    io.on('connection', async socket => {
        console.log('Un cliente se ha conectado')

        //guardar productos en la base de datos y mostrarlos
        socket.emit('products', await getData())
        socket.on('new-product', async data => {

            await insertData(data)

            const productos = await getData()

            io.sockets.emit('products', productos)
        })
    })
}

const socket = (io) => {
    socketMessaje(io)
    socketProduct(io)
}

home.get('/', listarArticulos)

module.exports = { home, socket }