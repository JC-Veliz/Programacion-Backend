const knex = require('knex')

class ClienteSQL {

    constructor(option){
        this.knex = knex(option)
    }

    crearTablaMensajes(){
        return this.knex.schema.dropTableIfExists('mensajes')
            .finally(() => {
                return this.knex.schema.createTable('mensajes', table => {

                    
                    table.string('nombre', 50)
                    table.string('fyh',50)  
                    table.string('mensaje', 50)                                       
                    table.increments('id').notNullable().primary()
                })
            })
    }

    crearTablaProductos(){
        return this.knex.schema.dropTableIfExists('productos')
            .finally(() => {
                return this.knex.schema.createTable('productos', table => {
                    
                    table.string('titulo', 50)
                    table.string('descripcion', 50)
                    table.integer('codigo')
                    table.float('precio')
                    table.string('foto', 1000) 
                    table.integer('stock') 
                    table.increments('id').notNullable().primary()
                })
            })
    }

    insertarArticulos(p){
        return this.knex('productos').insert(p)
    }

    insertarMensajes(m){
        return this.knex('mensajes').insert(m)
    }

    listarArticulos(){
        return this.knex('productos').select('*')
    }
    listarMensajes(){
        return this.knex('mensajes').select('*')
    }

    borrarArticulos(id){

        return this.knex('productos').where('id', '=', id).del()
    }

    actualizarStock(stock, id){
        return this.knex('productos').where('id', '=' , id).update({stock : stock})
    }

    close(){
        this.knex.destroy()
        
    }
}

module.exports = {ClienteSQL}
      