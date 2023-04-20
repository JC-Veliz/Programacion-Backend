
const {models} = require('../models/productos.js');
const {connect} = require('../config/mongoDbConfig.js');
const { faker } = require('@faker-js/faker');
faker.locale = 'es'
const  {loggerC, loggerW ,loggerE}  = require('../logger.js')




class ContenedorProductosMongoDB{
    constructor(){
        this.productos = [];      
    }    
    


    async crearProducto(id) {               
        
        try{       
            return {
                id: id, 
                nombre: faker.commerce.product(),
                descripcion: faker.commerce.product(),
                codigo: faker.commerce.product(),
                precio: faker.commerce.price(),
                stock: faker.commerce.price(),
                foto: faker.image.abstract(),
            }

        }catch (error){

            console.log(error)
        }
        
    }
    async saveProductos(producto){
        
        // await connect()
        // const prodNuevo = new models(producto)
        // const prodGuardado = prodNuevo.save()
        // loggerC.info('Producto Guardado')   
        // return prodGuardado
        try{         
            
            await connect()            
            // const mensajeNuevo = new model(mensaje)

            const todosProductos = JSON.stringify(await this.getAllProductos())
            console.log("aca!")
            console.log(todosProductos)

            if(todosProductos === "[]"){   
                
                const productoNuevo = {

                    titulo: producto.titulo,
                    descripcion: producto.descripcion,
                    codigo: producto.codigo,
                    precio: producto.precio,
                    foto: producto.foto,
                    stock: producto.stock,
                    id: 1,
            
               }
               const newProducto = new models(productoNuevo)
               const productoSave = newProducto.save()

                loggerC.info('Producto Guardado')
                return productoSave
        
            }else {    
                           
                const todosProductos = await this.getAllProductos()                
                       
                const ids = [];
        
                for(let i=0; i < todosProductos.length; i++){
                    ids.push(todosProductos[i].id)}
        
                    let objeto ={                        
                        titulo: producto.titulo,
                        descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        precio: producto.precio,
                        foto: producto.foto,
                        stock: producto.stock,
                        id: Math.max(...ids)+1,                          
                    }
                    const newProducto = new models(objeto)
                    const productoSave = newProducto.save()
            
                    loggerC.info('Producto Guardado')

            return productoSave  
        }
        }catch(error){            
            console.log(error)
        }

    }
    
   
    async getByIdProducto(id){
        try{
            await connect() 
            
            const productos = await models.findOne({_id: id},{__v:0});
           
            if(productos == null){
                return "No se encontro el producto con ese ID"
            }
                       
            return productos 

        }catch (error){
            console.log('No existe el archivo por ende no hay productos con el ID buscado')
            return 'No se encontro el producto con ese ID'
        }
    } 

    async getAllProductos(){
        try{
            
            await connect();

            const productos = await models.find({},{__v:0});
            

            return productos
            
        }catch (error){           
            console.log(error)       
            

            return 'No hay productos guardados'
            
        }
    }    


    async deleteProducto(id2){
        try{
                await connect()

                const producto = await models.deleteOne({id:id2})

                return producto          
             


        }catch (error){
            console.log(`Fallo la lectura `)
            return "Fallo la lectura"
        }
    }

    async updateById(id, producto) {

        try {
            await connect();
            const productoActualizado = await models.findByIdAndUpdate(id, producto, { new: true });
            return productoActualizado;
        } catch (error) {
            
            return "no se encontro el producto para actualizar"
        }
    }   
    
    
}

module.exports = ContenedorProductosMongoDB;