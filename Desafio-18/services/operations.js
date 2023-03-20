const { listar, insertar, listarMensajes, insertarMensaje } = require('../persistencia/operations.js')

async function getData() {
    const productos = await listar()
    return productos
}

async function insertData(data) {
    await insertar(data)
}

async function getMessages() {
    const mensajes = await listarMensajes()
    return mensajes
}

async function insertMessage(data) {
    await insertarMensaje(data)
}


module.exports = { getData, insertData, getMessages, insertMessage }

