import productoDAO from "../DAOs/ProductosDAO.js";
import dotenv from "dotenv";

dotenv.config();
const opcion = process.argv[3] || "Mongo";
const MONGO_DB_URI = process.env.URL_MONGO;

let dao = null;

class ProductosFactory {
  static getDao() {
    if (!dao) {
      switch (opcion) {
        case "Mongo":
          dao = new productoDAO.ProductsDAOMongoDB(MONGO_DB_URI);
          break;
        default:
          dao = new productoDAO.ProductsDAOMongoDB(MONGO_DB_URI);
      }
    }
    return dao;
  }
}

export default ProductosFactory;
