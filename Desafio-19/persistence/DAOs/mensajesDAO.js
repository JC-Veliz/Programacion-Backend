import mongoose from "mongoose";
import * as mensajesModel from "../../models/mensaje.js";
import { transformarADTO } from "../DTOs/MensajesDTO.js";

class MessagesDAOMongoDB {
  constructor(url) {
    this.url = url;
  }

  async connect() {
    try {
      await mongoose.connect(this.url, {
        useNewUrlParser: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      this.connect();

      const mensaje = await mensajesModel.mensajes.find({ _id: id });

      return transformarADTO(mensaje);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      this.connect();

      const mensaje = await mensajesModel.mensajes.deleteOne({ _id: id });

      console.log(mensaje);

      return transformarADTO(mensaje);
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    try {
      this.connect();

      const mensaje = await mensajesModel.mensajes.updateOne(
        { _id: id },
        {
          $set: { ...newData },
        }
      );

      console.log(mensaje);
      return transformarADTO(mensaje);
    } catch (error) {
      console.log(error);
    }
  }

  async save(object) {
    try {
      this.connect();

      const mensaje = new mensajesModel.mensajes(object);

      const saved = await mensaje.save();

      console.log(saved._id);
      return saved._id;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      this.connect();

      const mensajes = await mensajesModel.mensajes.find({}, { __v: 0 }).lean();
      return mensajes;
    } catch (error) {
      console.log(error);
    }
  }
}

export default { MessagesDAOMongoDB };
