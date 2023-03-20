const knex = require('knex')
const createTableProductosDTO = require('../DTO/productosDTO')

//creo la clase
class ClientSQL{
    constructor(options){
        this.knex = knex(options)
    }

    //mensaje para switch de opciones projects
    init() {
        console.log('Inicializando base de datos sql...')
        return this.crearTabla()
    }

    disconnect() {
        console.log('Desconectando base de datos sql...')
        return this.close()
    }
    
    //creo la tabla productos
    async crearTabla(){
        try {
            return this.knex.schema.dropTableIfExists('productos')
            .finally(() => {
                return this.knex.schema.createTable('productos', createTableProductosDTO())
            })
        } catch (error) {
            console.log('Error en crearTabla: ', error)
        }
    }
    //inserto los productos
    async insertarArticulos(articulos){
        try {
            return this.knex('productos').insert(articulos)
        } catch (error) {
            console.log('Error en insertarArticulos: ', error)
        }
    }
    //listo los productos
    async listarArticulos(){
        try {
            return this.knex.from('productos').select('*')
        } catch (error) {
            console.log('Error en listarArticulos: ', error)
        }
    }
    //borro un producto
    async borrarArticulos(id){
        try {
            await this.knex('productos').where('id', id).del()
        } catch (error) {
            console.log('Error en borrarArticulos: ', error)
        }
    }
    //actualizo el stock
    async actualizarStock(id, stock){
        try {
            await this.knex('productos').where('id', id).update({stock})
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
module.exports = ClientSQL