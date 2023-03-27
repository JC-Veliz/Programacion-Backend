import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const MONGO_DB_URI = process.env.URL_MONGO;

mongoose.set("strictQuery", true);

const connect = async () => {
  await mongoose.connect(MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default { connect };
