import ProductosDaoFactory from "../Factories/ProductosDaoFactory.js";
import { transformarADTO } from "../DTOs/ProductosDTO.js";
import ProductoRepo from "../../models/ProductoRepo.js";

export default class ProductosRepository {
  dao;

  constructor() {
    this.dao = ProductosDaoFactory.getDao();
  }

  async getAll() {
    const productos = await this.dao.getAll();
    return productos.map((p) => p);
  }

  async getById(id) {
    const producto = await this.dao.getById(id);
    return producto;
  }

  async save(nuevo) {
    return await this.dao.save(transformarADTO(nuevo));
  }

  async updateById(id, nuevo) {
    const producto = await this.dao.updateById(id, nuevo);
    return new ProductoRepo(producto);
  }

  async deleteById(id) {
    const producto = await this.dao.deleteById(id);
    return new ProductoRepo(producto);
  }
}
