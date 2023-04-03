import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformarADTO } from "../DTO/mensajesDTO.js";

export default class MensajesDAOMongoose {
  constructor(model) {
    this.model = model;
  }

  #generateDAOCompatible(mongooseOBJ) {
    if (Array.isArray(mongooseOBJ)) {
      return mongooseOBJ.map((m) => {
        return { id: m._id, email: m.email, name: m.name, lastname: m.lastname, age: m.age, alias: m.alias, avatar: m.avatar, text: m.text, timestamp: m.timestamp };
      });
    } else {
      return {
        id: mongooseOBJ._id,
        email: mongooseOBJ.email,
        name: mongooseOBJ.name,
        lastname: mongooseOBJ.lastname,
        age: mongooseOBJ.age,
        alias: mongooseOBJ.alias,
        avatar: mongooseOBJ.avatar,
        text: mongooseOBJ.text,
        timestamp: mongooseOBJ.timestamp,
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
      return await this.model.updateOne({ _id: id }, newObject);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    // RETURNS ALL ROWS IN ARRAY, EMPTY WHEN EMPTY COLLECTION
    try {
      const mensajes = await this.model.find();
      return transformarADTO(this.#generateDAOCompatible(mensajes));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      return await this.model.deleteOne({ _id: id });
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
