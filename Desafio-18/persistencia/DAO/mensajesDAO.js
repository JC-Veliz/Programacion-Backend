const knex = require('knex')
const createTableMensajeDTO = require('../DTO/mensajesDTO')

//creo la clase
class ClientSQLLite{
    constructor(options){
        this.knex = knex(options)
    }

    //mensaje para switch de opciones projects
    async init() {
        console.log('Inicializando base de datos sqlLite...')
        return this.crearTabla()
    }

    async disconnect() {
        console.log('Desconectando base de datos sqlLite...')
        return this.close()
    }

    //creo la tabla mensajes
    async crearTabla(){
        try {
            return this.knex.schema.dropTableIfExists('mensajes')
            .finally(() => {
                return this.knex.schema.createTable('mensajes', createTableMensajeDTO())
            })
        } catch (error) {
            console.log('Error en crearTabla: ', error)
        }
    }
    //inserto los productos
    async insertarArticulos(articulos){
        try {
            return this.knex('mensajes').insert(articulos)
        } catch (error) {
            console.log('Error en insertarArticulos: ', error)
        }
    }
    //listo los productos
    async listarArticulos(){
        try {
            return this.knex.from('mensajes').select('*')
        } catch (error) {
            console.log('Error en listarArticulos: ', error)
        }
    }
    //borro un producto
    async borrarArticulos(id){
        try {
            await this.knex('mensajes').where('id', id).del()
        } catch (error) {
            console.log('Error en borrarArticulos: ', error)
        }
    }
    //actualizo el stock
    async actualizarStock(id, stock){
        try {
            await this.knex('mensajes').where('id', id).update({stock})
        } catch (error) {
            console.log('Error en actualizarStock: ', error)
        }
    }
    //cierro la conexion
    close(){
        this.konex.destroy()
    }
}

//exporto
module.exports = ClientSQLLite