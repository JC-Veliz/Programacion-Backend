import mongoose from "mongoose";
import * as productosModel from "../../models/producto.js";
import { transformarADTO } from "../DTOs/ProductosDTO.js";

class ProductsDAOMongoDB {
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
      await this.connect();

      const producto = await productosModel.productos.findOne({ _id: id });

      return transformarADTO(producto);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      await this.connect();

      const producto = await productosModel.productos.deleteOne({ _id: id });

      console.log(producto);

      return transformarADTO(producto);
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    try {
      await this.connect();

      const producto = await productosModel.productos.updateOne(
        { _id: id },
        {
          $set: { ...newData },
        }
      );

      console.log(producto);
      return transformarADTO(producto);
    } catch (error) {
      console.log(error);
    }
  }

  async save(object) {
    try {
      await this.connect();

      const producto = new productosModel.productos(object);

      const saved = await producto.save();

      console.log(saved._id);
      return saved._id;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      await this.connect();

      const productos = await productosModel.productos
        .find({}, { __v: 0 })
        .lean();
      return productos;
    } catch (error) {
      console.log(error);
    }
  }
}

export default { ProductsDAOMongoDB };
