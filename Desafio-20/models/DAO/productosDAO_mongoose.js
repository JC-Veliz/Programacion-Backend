import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformarADTO } from "../DTO/productosDTO.js";

export default class ProductosDAOMongoose {
  constructor(model) {
    this.model = model;
  }

  #generateDAOCompatible(mongooseOBJ) {
    if (Array.isArray(mongooseOBJ)) {
      return mongooseOBJ.map((m) => {
        return { id: m._id, title: m.title, price: m.price, thumb: m.thumb };
      });
    } else {
      return {
        id: mongooseOBJ._id,
        title: mongooseOBJ.title,
        price: mongooseOBJ.price,
        thumb: mongooseOBJ.thumb,
      };
    }
  }

  async save(object) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformarADTO(this.#generateDAOCompatible(saved));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // WHEN NO ROW IS FOUND RETURNS EMPTY ARRAY
    try {
      return transformarADTO(this.#generateDAOCompatible(await this.model.findOne({ _id: id })));
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, newObject) {
    try {     
      await this.model.updateOne({ _id: id }, newObject);
      return transformarADTO({id: id, ...newObject});
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    // RETURNS ALL ROWS IN ARRAY, EMPTY WHEN EMPTY COLLECTION
    try {
      const productos = await this.model.find();
      return transformarADTO(this.#generateDAOCompatible(productos));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      await this.model.deleteOne({ _id: id });
      return id
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }
}
