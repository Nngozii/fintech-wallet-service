const express = require("express");
require("dotenv").config();

const db = require("./database/main")

const app = express();

port = process.env.PORT;

db.once("connection", () => {
  console.log("Database on!");
});
db.on("error", (error) => {
  console.log("Error", error);
});
db.on("disconnected", () => {
  console.log("MBD Disconnected");
});

app.listen((port) => {
  console.log("Successfully connected to server");
});
