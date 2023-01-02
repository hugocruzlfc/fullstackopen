import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGODB_URI;

export default function mongoConnection() {
  mongoose
    .connect(url)
    .then((resp) => console.log("Mongo DB connection"))
    .catch((error) => {
      console.log("error connecting to MongoDB:", error.message);
    });
}
