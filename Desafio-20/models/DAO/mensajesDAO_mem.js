import { transformarADTO } from "../DTO/mensajesDTO.js";

export default class MensajesDAOMem {
    constructor() {
        this.mensajes = []
    }

    #getIndex(id) {
        return this.mensajes.findIndex(p => p.id == id);
    }

    getAll() {
        return transformarADTO(this.mensajes);
    }

    getById(id) {
        return transformarADTO(this.mensajes[this.#getIndex(id)]);
    }

    save(object) {
        this.mensajes.push(object)
        return object
    }

    deleteById(id) {
        const deleted = transformarADTO(this.mensajes.splice(this.#getIndex(id), 1));
        return deleted
    }

    deleteAll() {
        this.mensajes = [];
    }

    update(id, mensaje) {
        const updated = {...this.mensajes[this.#getIndex(id)],...mensaje};
        this.mensajes.splice(this.#getIndex(id), 1, updated)
        return transformarADTO(updated);
    }
}