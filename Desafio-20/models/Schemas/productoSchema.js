import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const productsCollName = "products";

const productsSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    //id: {type: String, require: true},
    title: {type: String, require: true, max: 150},
    price: {type: Number, require: true},
    thumb: {type: String, require: true, max: 10}
})

const connection = mongoose.createConnection(process.env.MONGO_DB_STRING_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//export const products = mongoose.model(productsCollName, productsSchema);
export const productoSchema = connection.model(productsCollName, productsSchema);