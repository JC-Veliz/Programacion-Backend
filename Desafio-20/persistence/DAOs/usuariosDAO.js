import mongoose from "mongoose";
import * as usuariosModel from "../../models/usuario.js";
import { transformarADTO } from "../DTOs/UsuariosDTO.js";

class UsuariosDAOMongoDB {
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

      const usuario = await usuariosModel.User.find({ _id: id });

      return transformarADTO(usuario);
    } catch (error) {
      console.log(error);
    }
  }

  async getByUsername(username) {
    try {
      this.connect();

      const usuario = await usuariosModel.User.findOne({
        username: username,
      });

      return transformarADTO(usuario);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      this.connect();

      const usuario = await usuariosModel.User.deleteOne({ _id: id });

      console.log(usuario);

      return transformarADTO(usuario);
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    try {
      this.connect();

      const usuario = await usuariosModel.User.updateOne(
        { _id: id },
        {
          $set: { ...newData },
        }
      );

      console.log(usuario);
      return transformarADTO(usuario);
    } catch (error) {
      console.log(error);
    }
  }

  async save(object) {
    try {
      this.connect();

      const usuario = new usuariosModel.User(object);

      const saved = await usuario.save();

      console.log(saved._id);
      return saved._id;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      this.connect();

      const usuarios = await usuariosModel.User.find({}, { __v: 0 }).lean();
      console.log(usuarios);
      return transformarADTO(usuarios);
    } catch (error) {
      console.log(error);
    }
  }
}

export default { UsuariosDAOMongoDB };
