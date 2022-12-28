const {model} = require('../models/productos.js');
const {connect} = require('../config/mongoDbConfig.js');


class ContenedorProductoMongoDB{
    constructor(){
        this.productos = [];      
    }

    
    async save(producto){
        try{         
            
            await connect()
            const productoNuevo = new model(producto)
            const productoGuardado = await productoNuevo.save()

            console.log(productoGuardado)

            return productoGuardado      

            
            
            
        }catch(error){            
           
            console.log(error)
        }

        
    }

    async getById(id1){
        try{
            console.log('Entre Getbyid')
            await connect()
            const productos = await model.findById(id1)

              
            return productos 

        }catch (error){
            console.log('No existe el archivo por ende no hay productos con el ID buscado')
            return 'No se encontro el producto con ese ID'
        }
    }   
    async getAll(){
        try{
            console.log('entre!')
            await connect();

            const productos1 = await model.find();
            console.log(productos1)

            return productos1
            
        }catch (error){           
            console.log(error)       
            

            return 'No hay productos guardados'
            
        }
    }

    async deleteById(id2){
        try{
                await connect()

                const producto = await model.findByIdAndDelete(id2)

                return producto
            
             


        }catch (error){
            console.log(`Fallo la lectura `)
            return "Fallo la lectura"
        }
    }

    async updateById(id, producto) {

        try {
            await connect();
            const productoActualizado = await model.findByIdAndUpdate(id, producto
                , { new: true });
            return productoActualizado;
        } catch (error) {
            console.log(error);
        }
    }    

}

module.exports = ContenedorProductoMongoDB;