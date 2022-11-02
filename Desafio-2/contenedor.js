const fs = require('fs');
const ruta = './productos.txt'

class Contenedor{
    constructor(pathFile){
        this.pathFile = pathFile        
    }
    
    async save(title, price, thumbnail){
        try{
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
                      
            let lectura1 = JSON.parse(lectura) 
            let ids = [];
            

            for(let i=0; i < lectura1.length; i++){
                ids.push(lectura1[i].id)

            } 

            let objeto ={
                title,
                price,
                thumbnail,
                id: Math.max(...ids)+1                              
            }
            
            lectura1.push(objeto)
            
            let lectura2 = JSON.stringify(lectura1, null, 2)
                  

            fs.writeFileSync(this.pathFile, lectura2)
            console.log(`Producto Agregado, ID asignado: ${Math.max(...ids)+1}`)       

        }catch(error){            
           
            let objeto ={
                title,
                price,
                thumbnail,
                id: 1                
            }           
        
            let lectura2 = JSON.stringify([objeto], null, 2)       

            fs.writeFileSync(this.pathFile, lectura2)
            
            console.log('Producto guardado con ID=1!')
        }

        
    }

    async getById(id1){
        try{
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
                       
            let lectura1 = JSON.parse(lectura) 
            
            let resultado = lectura1.filter( function (lectura1) {
                return lectura1.id == id1
              })
            let resultado1 = (resultado.length > 0) ? resultado[0] : null
            console.log(`El ID buscado es:`) 
            console.log(resultado1)     

        }catch (error){
            console.log('No se pudo leer el archivo')
        }
    }   
    async getAll(){
        try{
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
            console.log('Todos los productos: ')            
            let lectura1 = JSON.parse(lectura)
            
            
                        
            console.log((lectura1))           
            
        }catch (error){
            console.log('No se pudo leer el archivo')
        }
    }

    async deleteById(id2){
        try{
            let lectura = await fs.promises.readFile(this.pathFile, 'utf-8');
                       
            let lectura1 = JSON.parse(lectura)            
                        
            const indice = lectura1.findIndex(lectura1 => lectura1.id === id2)
            
            const eliminarProducto = lectura1.splice(indice,1)
            
            let lectura2 = JSON.stringify(lectura1, null, 2)       

            fs.writeFileSync(this.pathFile, lectura2)
            
            console.log(`Se elimino el producto correctamente: `)
            console.log(eliminarProducto)

        }catch (error){
            console.log('No se pudo leer el archivo')
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

module.exports.Contenedor = Contenedor;

