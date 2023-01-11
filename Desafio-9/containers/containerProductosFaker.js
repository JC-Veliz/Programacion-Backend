const { faker } = require('@faker-js/faker');
faker.locale = 'es'

class ContenedorProductosFaker{
    constructor(){
        this.mensajes = [];      
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

}

module.exports = ContenedorProductosFaker;



// const { Router } = require('express');
// const { faker } = require('@faker-js/faker');
// faker.locale = 'es'

// const productosTest = Router();


// productosTest.get('/', (req, res) => {
//     let productos = []
//     for (let i = 0; i < 6; i++) {
//         productos.push(crearProducto(i+1))
//     }

//     res.render('index', {productos})
// })

// function crearProducto(id) {
//     return {
//         id: id, 
//         nombre: faker.commerce.product(),
//         descripcion: faker.commerce.product(),
//         codigo: faker.commerce.product(),
//         precio: faker.commerce.price(),
//         stock: faker.commerce.price(),
//         foto: faker.image.abstract(),
//     }
// }
// module.exports = productosTest;