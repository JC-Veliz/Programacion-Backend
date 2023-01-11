const {model} = require('../models/mensajes.js');
const {connect} = require('../config/mongoDbConfig.js');



class ContenedorProductoMongoDB{
    constructor(){
        this.mensajes = [];      
    }

    
    async save(mensaje){
        try{         
            
            await connect()
            const mensajeNuevo = new model(mensaje)
            const mensajeGuardado = await mensajeNuevo.save()
            

            return mensajeGuardado  
        }catch(error){            
            console.log(error)
        }
    }

    async getById(id1){
        try{
            await connect()
            const productos = await model.findById(id1)

              
            return productos 

        }catch (error){
            console.log('No existe el archivo por ende no hay productos con el ID buscado')
            return 'No se encontro el producto con ese ID'
        }
    } 
    async getAll1(){
        try{
            
            await connect();

            const mensajes1 = await model.find({},{_id:0,__v:0});
            

            return mensajes1
            
        }catch (error){           
            console.log(error)       
            

            return 'No hay productos guardados'
            
        }
    }  
    async getAll(){
        try{
            
            await connect();

            const mensajes1 = await model.find();
            

            return mensajes1
            
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

    async updateById(id, mensaje) {

        try {
            await connect();
            const productoActualizado = await model.findByIdAndUpdate(id, mensaje, { new: true });
            return productoActualizado;
        } catch (error) {
            console.log(error);
        }
    }   
    
    
}

module.exports = ContenedorProductoMongoDB;