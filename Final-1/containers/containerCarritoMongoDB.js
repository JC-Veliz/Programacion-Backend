const {connect} = require('../config/mongoDbConfig.js');
const {modelC} = require('../models/carrito.js');
const { productos } = require('../routers/routers.js');
const  {loggerC, loggerW ,loggerE}  = require('../logger.js')

class ContenedorCarritosMongoDB{
    constructor(){
        this.carrito= [];
    }
    async todosLosCarritos(){
        try{
            await connect();
            const carritos = await modelC.find();
            return carritos
            
        }catch (error){           
            loggerC.info(error) 
            return 'No hay productos guardados'            
        }
    }    

    async agregarCarrito(){
        try{
            await connect()

            const carrito = {
                productos: [],
                timestamp: new Date(),
                id: Date.now()
            }

            const nuevoCarrito = new modelC(carrito)
            const carritoGuardado = nuevoCarrito.save()

            
            return carritoGuardado        

        }catch(error){
            loggerC.info('Error en agregar Carrito: ', error)
        }
    }
    
    async carritoPorId(id){
        try{
            await connect()
            const carrito = await modelC.findOne({_id: id})

            console.log(carrito)

            if(carrito == undefined || carrito == null){
                return {error: 'carrito no encontrado'}
            }else{
                return carrito
            }


        }catch(error){
            loggerC.info(error)
        }
    }
    async agregarProductoCarrito(id, producto){
        try{
            await connect();            
            const carrito = await modelC.findOne({_id: id})
            const productoExistente = JSON.stringify(carrito.productos)
           

            if(carrito == undefined || carrito == null){
                return {error: 'carrito no encontrado'}
            }else{

                if(productoExistente === "[]"){
                   
    
                    const objeto ={
                        titulo: producto.titulo,
                        descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        precio: producto.precio,
                        foto: producto.foto,
                        stock: producto.stock,
                        id: 1,
                        timestamp: Date.now(),
                    }

                    carrito.productos.push(objeto)

                    const nuevoProductoCarrito = new modelC(carrito)
                    const carritoProductoGuardado = nuevoProductoCarrito.save()
        
                    loggerC.info('Producto Guardado en el carrito')
                    return carritoProductoGuardado 
                }else{                    
                    const ids = [];
                    
                    for(let i=0;i < carrito.productos.length; i++){
                        ids.push(carrito.productos[i].id)}

                        

                        let objeto ={
                            titulo: producto.titulo,
                            descripcion: producto.descripcion,
                            codigo: producto.codigo,
                            precio: producto.precio,
                            foto: producto.foto,
                            stock: producto.stock,
                            timestamp: Date.now(),
                            id: Math.max(...ids)+1
                        }
                        
                        carrito.productos.push(objeto)

                        console.log(carrito) 

                    const nuevoProductoCarrito = new modelC(carrito)
                    const carritoProductoGuardado = await nuevoProductoCarrito.save()

                    loggerC.info('Producto Guardado en el carrito')

                    return carritoProductoGuardado 
                }
            }
        }catch(error){
            loggerC.info('Error en agregar producto al carrito: ', error)
        }

    }

    async todosProductosCarrito(id){
        try{
            await connect()
            const carrito = await this.carritoPorId(id)

            if(carrito == undefined || carrito == null){
                loggerC.info("carrito no encontrado")
            }else{
                return carrito.productos
            }


        }catch(error){
            loggerC.info(error)
        }

    }
    async borrarProductoPorId(id, idProducto){
        try{
            await connect()

            const carrito = await modelC.findOne({_id: id})

            if(carrito == undefined || carrito == null){
                loggerC.info("carrito no encontrado")
            }else{
                const productoExistente = carrito.productos.find((prod)=> prod.id === idProducto)

                if(!productoExistente){
                    return {error: "Producto no encontrado"}
                }else{
                    carrito.productos = carrito.productos.filter((prod)=> prod.id !== idProducto)

                    const nuevoCarrito = await modelC.findByIdAndUpdate(id, carrito, {new: true}) 
                    loggerC.info("Producto eliminado del carrito correctamente")
                    return nuevoCarrito
                }

            }
        }catch(error){
            loggerC.info(error)
        }
    }

    async borrarCarritoId(id){
        try {
            await connect()
            const carrito = await modelC.findOne({_id: id})

            if (!carrito) {
                return { error: 'No existe' }
            } else {

                const carritoEliminado = await modelC.deleteOne({_id : id}) 
                
                return carritoEliminado
            }
        } catch (error) {
            loggerC.info('Error en deleteCarrito: ', error)
        }
    }

}

module.exports = ContenedorCarritosMongoDB;