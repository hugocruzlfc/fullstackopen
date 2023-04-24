require("dotenv").config();

const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

function mongoConnect() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("connected to MongoDB");
      console.log("DB url:", MONGODB_URI);
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message);
    });
}

module.exports = mongoConnect();
