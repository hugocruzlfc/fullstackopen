const mongoose = require("mongoose");
//const dotenv = require("dotenv");

const { MONGODB_URI } = require("../utils/config");

//dotenv.config();
const url = MONGODB_URI;

function mongoConnection() {
  mongoose
    .connect(url)
    .then((resp) =>
      console.log("Mongo DB connection in version: " + `${resp.version}`)
    )
    .catch((error) => {
      console.log("error connecting to MongoDB:", error.message);
    });
}

module.exports = mongoConnection;
