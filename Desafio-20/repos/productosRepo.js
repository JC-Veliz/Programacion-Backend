import Producto from "../models/Model/producto.js";
import { transformarADTO } from "../models/DTO/productosDTO.js";
import ProductosDAOFactory from "../models/factories/productosDAOFactory.js";



export default class ProductosRepo {

    constructor() {

        this.factory = ProductosDAOFactory.getInstance();
        this.dao = this.factory.getDao()
        
        // SI DESCONMENTAS ESTO AL INSTANCIAR LA CLASE, CREA UN DATE CON EL TIMESTAMP
        // SI LA VUELVO A INSTANCIAR Y COMPARO LOS DATES SON INGUALES ENTONCES ES LA MISMA INSTANCIA.
        
        // console.log(this.factory.date)
        // this.factory2 = ProductosDAOFactory.getInstance();
        // console.log(this.factory2.date)

    }

    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new Producto(dto))
    }

    async getById(id) {
        const dto = await this.dao.getById(id);
        return new Producto(dto)
    }

    async save(producto) {
        const dto = transformarADTO(producto);
        const saved = await this.dao.save(dto);
        return new Producto(saved)
    }

    async deleteAll() {
        await this.dao.deleteAll();
    }

    async deleteById(id) {
        const removed = await this.dao.deleteById(id);
        return removed
    }

    async update(id, producto) {
        const updated = await this.dao.update(id, transformarADTO(producto))
        return new Producto(updated)
    }
}