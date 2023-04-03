import Mensaje from "../models/Model/mensaje.js";
import { transformarADTO } from "../models/DTO/mensajesDTO.js";
import MensajesDAOFactory from "../models/factories/mensajesDAOFactory.js";



export default class MensajesRepo {

    constructor() {

        this.factory = MensajesDAOFactory.getInstance();
        this.dao = this.factory.getDao()

    }

    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new Mensaje(dto))
    }

    async getById(id) {
        const dto = await this.dao.getById(id);
        console.log(dto)
        return new Mensaje(dto)
    }

    async save(producto) {
        const dto = transformarADTO(producto);
        const saved = await this.dao.save(dto);
        return new Mensaje(saved)
    }

    async deleteAll() {
        await this.dao.deleteAll();
    }

    async deleteById(id) {
        const removed = await this.dao.deleteById(id);
        return new Mensaje(removed)
    }

    async update(id, mensaje) {
        const updated = await this.dao.update(id, transformarADTO(mensaje))
        return new Mensaje(updated)
    }
}