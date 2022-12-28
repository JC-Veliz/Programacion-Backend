const db = require('../config/firebaseConfig')
const fs = require('fs');


class Carrito{
    constructor(){
        this.carritos = db.collection('carritos')       
    }

    async agregarCarrito() {
        try {
            const carrito = {
                id: Date.now(),
                timestamp: new Date(),
                productos: []
            }
            await this.carritos.doc(carrito.id.toString()).set(carrito)
            return carrito.id
        } catch (error) {
            console.log('Error en saveCarrito: ', error)
        }
    }
    // todos los carritos
    async getAll(){
        try {
            const carritos = await this.carritos.get();
            const carritosArray = [];
            carritos.forEach((carrito) => {
                carritosArray.push(carrito.data())
            })
            return carritosArray
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    // vacia un carrito y lo elimina
    async deleteCarritoId(id){
        try {
            const carrito = await this.carritos.doc(id.toString()).get();
            if (!carrito.exists) {
                return { error: 'No existe' }
            } else {
                await this.carritos.doc(id.toString()).delete();
                return carrito.data()
            }
        } catch (error) {
            console.log('Error en deleteCarrito: ', error)
        }
    }
    //ver todos los productos de carrito
    async getProductosCarrito(id) {
        try {
            const carrito = await this.carritos.doc(id.toString()).get();
            if (!carrito.exists) {
                return { error: 'carrito no encontrado' }
            } else {
                return carrito.data().productos
            }
        } catch (error) {
            console.log('Error en getProductosCarrito: ', error)
        }
    }

    //Agrega un producto al carrito. Si el producto ya existe en el carrito,
    //se actualiza la cantidad.
    async posProductoCarrito(id, producto) {
        try {
            const carrito = await this.carritos.doc(id.toString()).get();
            if (!carrito.exists) {
                return { error: 'carrito no encontrado' }
            } else {
                const carritoData = carrito.data()
                
                let productoExistente = JSON.stringify(carritoData.productos)
                

                if (productoExistente === "[]") {
                    
                    let objeto ={
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        precio: producto.precio,
                        foto: producto.foto,
                        stock: producto.stock,
                        timestamp: Date.now(),
                        id: 1
                    }

                    carritoData.productos.push(objeto)
                } else {
                    
                    const ids = []

                    for(let i=0; i < carritoData.productos.length; i++){
                        ids.push(carritoData.productos[i].id)}                       
    
                        let objeto ={
                            nombre: producto.nombre,
                            descripcion: producto.descripcion,
                            codigo: producto.codigo,
                            precio: producto.precio,
                            foto: producto.foto,
                            stock: producto.stock,
                            timestamp: Date.now(),
                            id: Math.max(...ids)+1                            
                    
                    }

                    carritoData.productos.push(objeto)
                }
                await this.carritos.doc(id.toString()).update(carritoData)
                return carritoData
            }
        } catch (error) {
            console.log('Error en addProductoCarrito: ', error)
        }
    }
    //Elimina un producto del carrito.
    async deleteProductoById(id, idProducto) {
        try {
            const carrito = await this.carritos.doc(id.toString()).get();
            if (!carrito.exists) {
                return { error: 'carrito no encontrado' }
            } else {
                const carritoData = carrito.data()
                const productoExistente = carritoData.productos.find((prod) => prod.id === idProducto)
                if (!productoExistente) {
                    return { error: 'producto no encontrado' }
                } else {
                    carritoData.productos = carritoData.productos.filter((prod) => prod.id !== idProducto)
                    await this.carritos.doc(id.toString()).update(carritoData)
                    return carritoData
                }
            }
        } catch (error) {
            console.log('Error al borrar: ', error)
        }
    }   
   

}

module.exports = Carrito;