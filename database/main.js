const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then((res) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error connecting to Database");
  });

const db = mongoose.connection;

module.exports = db;
