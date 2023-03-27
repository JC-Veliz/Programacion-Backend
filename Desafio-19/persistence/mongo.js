import mongoose from "mongoose";
import * as mensajesModel from "../models/mensaje.js";
import * as usuariosModel from "../models/usuario.js";

class Mongo {
  constructor(url, type) {
    this.url = url;
    this.type = type;
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

      const mensaje =
        this.type == "mensajes"
          ? await mensajesModel.mensajes.find({ _id: id })
          : await usuariosModel.usuarios.find({ _id: id });

      return mensaje;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      this.connect();

      const mensaje =
        this.type == "mensajes"
          ? await mensajesModel.mensajes.deleteOne({ _id: id })
          : await usuariosModel.usuarios.deleteOne({ _id: id });

      console.log(mensaje);

      return mensaje;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    try {
      this.connect();

      if (this.type == "mensajes") {
        const mensaje = await mensajesModel.mensajes.updateOne(
          { _id: id },
          {
            $set: { ...newData },
          }
        );
      } else {
        const mensaje = await usuariosModel.usuarios.updateOne(
          { _id: id },
          {
            $set: { ...newData },
          }
        );
      }

      console.log(mensaje);
      return mensaje;
    } catch (error) {
      console.log(error);
    }
  }

  async save(object) {
    try {
      this.connect();

      const mensaje =
        this.type == "mensajes"
          ? new mensajesModel.mensajes(object)
          : new usuariosModel.usuarios(object);

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

      const mensajes =
        this.type == "mensajes"
          ? await mensajesModel.mensajes.find({}, { __v: 0 }).lean()
          : await usuariosModel.usuarios.find({}, { __v: 0 }).lean();
      console.log(mensajes);
      return mensajes;
    } catch (error) {
      console.log(error);
    }
  }
}

export const MongoDB = Mongo;
