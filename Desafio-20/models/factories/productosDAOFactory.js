import ProductosDAOMem from "../DAO/productosDAO_mem.js";
import ProductosDAOMongoose from "../DAO/productosDAO_mongoose.js";
import { productoSchema } from "../Schemas/productoSchema.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class ProductosDAOFactory {
  constructor(){
    this.date = Date.now()
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO")
        return new ProductosDAOMongoose(productoSchema);
        break;
      case "mem":
        console.log("PERSISTENCE IN MEMORY")
        return new ProductosDAOMem();
        break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)")
        return new ProductosDAOMem();
        break;
    }
  }

  static getInstance() {
    if(!this.instance) {
      this.instance = new ProductosDAOFactory()
    }
    return this.instance;
  }
}
