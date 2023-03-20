
const { option } = require('../options/mysqlconnection.js')
const { optionLite } = require('../options/myslLiteconnection')
const ClientSQL = require('./DAO/productosDAOFactory.js')
const ClientSQLLite = require('./DAO/mensajesDAOFactory.js')

const sql = ClientSQL.getDAO()
const sqlLite = ClientSQLLite.getDAO()

async function listar() {
    return await sql.listarArticulos()
}

async function insertar(data) {
    await sql.insertarArticulos(data)
}

async function listarMensajes() {
    return await sqlLite.listarArticulos()
}

async function insertarMensaje(data) {
    await sqlLite.insertarArticulos(data)
}

module.exports = { listar , insertar, listarMensajes, insertarMensaje }