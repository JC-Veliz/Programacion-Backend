const fs = require('fs');
const ruta = './baseDatos/productos.txt'


class Producto{
    constructor(pathFile){
        this.pathFile = pathFile        
    }

    
    async save(nombre,descripcion,codigo,precio,foto,stock){
        try{           
            
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
            console.log(lectura)
            if (lectura === "[]"){
                
                let lectura1 = JSON.parse(lectura)
                            
                let objeto ={
                    nombre,
                    descripcion,
                    codigo,
                    precio,
                    foto,
                    stock,
                    timestamp: Date.now(),
                    id: 1                              
                }
                lectura1.push(objeto)
                
                let lectura2 = JSON.stringify(lectura1, null, 2)
                
                fs.writeFileSync(this.pathFile, lectura2)
                console.log(`Producto Agregado, ID asignado: 1`)
                return objeto

            }
            else{
                let lectura1 = JSON.parse(lectura)
                const ids = [];
                
                for(let i=0; i < lectura1.length; i++){
                    ids.push(lectura1[i].id)}

                    let objeto ={
                        nombre,
                        descripcion,
                        codigo,
                        precio,
                        foto,
                        stock,
                        timestamp: Date.now(),
                        id: Math.max(...ids)+1                              
                    }
                    lectura1.push(objeto)

                let lectura2 = JSON.stringify(lectura1, null, 2)
                    

                fs.writeFileSync(this.pathFile, lectura2)
                console.log(`Producto Agregado, ID asignado: ${Math.max(...ids)+1}`)
                return objeto             

            }
            
            
        }catch(error){            
           
            let objeto ={
                nombre,
                descripcion,
                codigo,
                precio,
                foto,
                stock,
                timestamp: Date.now(),                
                id: 1                
            }           
        
            let lectura2 = JSON.stringify([objeto], null, 2)       

            fs.writeFileSync(this.pathFile, lectura2)
            
            console.log('Producto guardado con ID=1!')

            return objeto 
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

    async deleteById(id2){
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

    async deleteAll(){
        try{
            fs.writeFileSync(this.pathFile, "")
            console.log('Todos los productos fueron eliminados')
        }catch(error){
            console.log('No hay productos para eliminar')
        }

    }

}

module.exports = Producto;