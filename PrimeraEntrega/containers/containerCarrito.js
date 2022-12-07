const fs = require('fs');
const ruta = './baseDatos/carrito.txt'


class Carrito{
    constructor(pathFile){
        this.pathFile = pathFile        
    }

    async agregarCarrito(){
        const nuevoCarrito = {
            productos: [],
            timestamp: Date.now(),
            id
        }
        const carrito = []
        carrito.push(nuevoCarrito)

        return carrito
    }
    validarProductoCarrito = (carrito,producto) => {

        const productoCarrito = carrito?.productos?.find(productoCarrito => productoCarrito.id === producto.id)
        if(productoCarrito === undefined){
            return false;
        }

        return true
    } 



    async posProductoCarrito(carritoId,idCarrito,allCarrito,producto) {
        
        if(this.validarProductoCarrito(carritoId,producto)){
            return {error: 'El producto ya existe en el carrito'}
        }
        carritoId.productos.push(producto)
    
        const indice = allCarrito.findIndex(allCarrito => allCarrito.id === parseInt(idCarrito))
        
        allCarrito[indice] = carritoId

        let lectura = JSON.stringify(allCarrito, null, 2)

        fs.writeFileSync(this.pathFile, lectura)

        return {producto: "Añadido"}
    }
    
    async save(productos){
        try{           
            
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
            
            if (lectura === "[]"){
                
                let lectura1 = JSON.parse(lectura)
                            
                let objeto ={
                    productos,
                    timestamp: Date.now(),
                    id: 1                              
                }
                lectura1.push(objeto)
                
                let lectura2 = JSON.stringify(lectura1, null, 2)
                
                fs.writeFileSync(this.pathFile, lectura2)
                console.log(`Carrito Agregado, ID asignado: 1`)
                return objeto

            }
            else{
                let lectura1 = JSON.parse(lectura)
                const ids = [];
                
                for(let i=0; i < lectura1.length; i++){
                    ids.push(lectura1[i].id)}

                    let objeto ={
                        productos,
                        timestamp: Date.now(),
                        id: Math.max(...ids)+1                              
                    }
                    lectura1.push(objeto)

                let lectura2 = JSON.stringify(lectura1, null, 2)
                    

                fs.writeFileSync(this.pathFile, lectura2)
                console.log(`Carrito Agregado, ID asignado: ${Math.max(...ids)+1}`)
                return objeto             

            }
            
            
        }catch(error){            
           
            let objeto ={
                productos,
                timestamp: Date.now(),                
                id: 1                
            }           
        
            let lectura2 = JSON.stringify([objeto], null, 2)       

            fs.writeFileSync(this.pathFile, lectura2)
            
            console.log('Carrito guardado con ID=1!')

            return objeto 
        }

        
    }
    async getByIdCarrito(id1){
        try{
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
                       
            let lectura1 = JSON.parse(lectura) 
            
            
            let resultado = lectura1.filter( function (lectura1) {
                return lectura1.id == id1
                
              })
              
            let resultado1 = (resultado.length > 0) ? resultado[0] : "no hay Carrito con ese ID"
            // console.log(`El ID buscado es:`) 
               
            return resultado1  

        }catch (error){
            console.log('No existe el archivo por ende no hay productos con el ID buscado')
            return 'No se encontro el producto con ese ID'
        }
    }  

    async getById(id1){
        try{
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
                       
            let lectura1 = JSON.parse(lectura) 
            
            
            let resultado = lectura1.filter( function (lectura1) {
                return lectura1.id == id1
                
              })
              
            let resultado1 = (resultado.length > 0) ? resultado[0] : "no hay productos con ese ID"
            // console.log(`El ID buscado es:`) 
               
            return resultado1  

        }catch (error){
            console.log('No existe el archivo por ende no hay productos con el ID buscado')
            return 'No se encontro el producto con ese ID'
        }
    }   
    async getAll(){
        try{
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
            // console.log('Todos los productos: ')            
            let lectura1 = JSON.parse(lectura)            
            
            return lectura1
            
        }catch (error){           
            
        
            let lectura2 = JSON.stringify([] , null, 2)       

            fs.writeFileSync(this.pathFile, lectura2)
            
            console.log('Archivo creado')

            return 'No hay productos guardados, archivo contenedor creado'
            
        }
    }

    async deleteCarritoId(id2){
        try{
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
                       
            let lectura1 = JSON.parse(lectura)            
                        
            const indice = lectura1.findIndex(lectura1 => lectura1.id === id2)

            const resultado = lectura1.filter( function (lectura1) {
                return lectura1.id === id2
              })
            const resultado1 = (resultado.length > 0) ? resultado[0] : null

            if (resultado1 === null){                
            
                return 'No existe'                
             }else {
                const eliminarProducto = lectura1.splice(indice,1)
            
                let lectura2 = JSON.stringify(lectura1, null, 2)       

                fs.writeFileSync(this.pathFile, lectura2)
                
                return eliminarProducto
             }           
            
             


        }catch (error){
            console.log(`Fallo la lectura `)
            return "Fallo la lectura"
        }
    }

    async deleteProductoById(idCarrito, idProducto){
        try{
            const carritos = await this.getAll();                           
            const carrito = carritos.find(carritos => carritos.id === parseInt(idCarrito))
            
            if(carrito === undefined){

                return {error:'Carrito no encontrado' }

            }else{
                
                const eliminarProducto = carrito.productos.find(carrito => carrito.id === parseInt(idProducto))
                
                if(eliminarProducto === undefined){

                    return {error: 'Producto no encontrado'}

                }else{

                    const resultado = carrito.productos.indexOf(eliminarProducto)
                    const productoEliminado = carrito.productos.splice(resultado,1)
                    const indice = carritos.indexOf(carrito)
                    carritos[indice] = carrito                    
                    fs.writeFileSync(this.pathFile, JSON.stringify(carritos, null, 2))
                    return {productoEliminado: productoEliminado}                    
                }                
            }        
        }catch (error){
            
            console.log(`Fallo la lectura `)
            return "Fallo la lectura"
        }
    }

    async deleteAll(){
        try{
            fs.writeFileSync(this.pathFile, "")
            console.log('Todos los productos fueron eliminados')
        }catch(error){
            console.log('No hay productos para eliminar')
        }

    }

}

module.exports = Carrito;