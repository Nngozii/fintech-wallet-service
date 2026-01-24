const express = require("express");
require("dotenv").config();
const app = express();

port = process.env.PORT;

app.listen((port) => {
  console.log("Successfully connected to server");
});
