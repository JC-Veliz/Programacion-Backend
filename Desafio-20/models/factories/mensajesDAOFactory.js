import MensajesDAOMem from "../DAO/mensajesDAO_mem.js";
import MensajesDAOMongoose from "../DAO/mensajesDAO_mongoose.js";
import { messageSchema } from "../Schemas/mensajeSchema.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class MensajesDAOFactory {

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO")
        return new MensajesDAOMongoose(messageSchema);
        break;
      case "mem":
        console.log("PERSISTENCE IN MEMORY")
        return new MensajesDAOMem();
        break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)")
        return new MensajesDAOMem();
        break;
    }
  }

  static getInstance() {
    if(!this.instance) {
      this.instance = new MensajesDAOFactory()
    }
    return this.instance;
  }
}
