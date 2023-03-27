import MensajesDaoFactory from "../Factories/MensajesDAOFactory.js";
import { transformarADTO } from "../DTOs/MensajesDTO.js";
import MensajeRepo from "../../models/MensajeRepo.js";

export default class MensajesRepository {
  dao;

  constructor() {
    this.dao = MensajesDaoFactory.getDao();
  }

  async getAll() {
    const mensajes = await this.dao.getAll();
    return mensajes;
    // return mensajes.map((p) => new MensajeRepo(p));
  }

  async getById(id) {
    const mensaje = await this.dao.getById(id);
    return new MensajeRepo(mensaje);
  }

  async save(nuevo) {
    await this.dao.save(transformarADTO(nuevo));
    return nuevo;
  }

  async deleteById(id) {
    const mensaje = await this.dao.deleteById(id);
    return new MensajeRepo(mensaje);
  }
}
