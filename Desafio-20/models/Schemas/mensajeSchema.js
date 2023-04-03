import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const messagesCollName = "messages";

const messagesSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    email: {type: String, require: true, max: 100},
    name: {type: String, require: true, max: 50},
    lastname: {type: String, require: true, max: 50},
    age: {type: Number, require: true},
    alias: {type: String, require: true, max: 50},
    avatar: {type: String, require: true, max: 200},
    text: {type: String, require: true, max: 200},
    timestamp: {type: String, require: true, max: 50},
})

const connection = mongoose.createConnection(process.env.MONGO_DB_STRING_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//export const products = mongoose.model(messagesCollName, messagesSchema);
export const messageSchema = connection.model(messagesCollName, messagesSchema);