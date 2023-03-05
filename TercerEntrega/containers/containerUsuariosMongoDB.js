
const {modelU} = require('../models/usuarios.js');
const {connect} = require('../config/mongoDbConfig.js');


class ContenedorUsuariosMongoDB{
    constructor(){
        this.usuario = [];      
    }
       

    async requireAuthentication(req, res, next) {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect('/login')
        }
    }

    async getUserData(req, res, next) {
        req.user = usuarios.find(usuario => usuario.nombre == req.session.nombre)

        next()
    }





    
    async guardarUsuario(usuario){
        
        await connect()
        const usuarioNuevo = new modelU(usuario)
        const usuarioGuardado = usuarioNuevo.save()
            
        return usuarioGuardado

    }
    

    async getById(id1){
        try{
            await connect()
            const productos = await modelU.findById(id1)

              
            return productos 

        }catch (error){
            console.log('No existe el archivo por ende no hay productos con el ID buscado')
            return 'No se encontro el producto con ese ID'
        }
    } 
    async getAll1(){
        try{
            
            await connect();

            const usuarios = await modelU.find({},{_id:0,__v:0});

                     

            return usuarios
            
        }catch (error){           
            console.log(error)       
            

            return 'No hay productos guardados'
            
        }
    }  
    async getAll(nombre){
        try{
            
            await connect();

            const nombre1 = await modelU.findOne({nombre: nombre},{_id:0,__v:0});
            return nombre1
            
        }catch (error){           
            console.log(error)       
            

            return 'No hay productos guardados'
            
        }
    }
    async getAllProductos(){
        try{
            
            await connect();

            const productos = await modelU.find({},{_id:0,__v:0});
            

            return productos
            
        }catch (error){           
            console.log(error)       
            

            return 'No hay productos guardados'
            
        }
    }
    


    async deleteById(id2){
        try{
                await connect()

                const producto = await modelU.findByIdAndDelete(id2)

                return producto
            
             


        }catch (error){
            console.log(`Fallo la lectura `)
            return "Fallo la lectura"
        }
    }

    async updateById(id, mensaje) {

        try {
            await connect();
            const productoActualizado = await modelU.findByIdAndUpdate(id, mensaje, { new: true });
            return productoActualizado;
        } catch (error) {
            console.log(error);
        }
    }
    
    getall2(){
        try{
            
            connect();

            const productos = modelU.find({},{_id:0,__v:0});
            

            return productos
            
        }catch (error){           
            console.log(error)       
            

            return 'No hay productos guardados'
            

    }
}
    
    
}

module.exports = ContenedorUsuariosMongoDB;