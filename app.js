const express = require("express");
require("dotenv").config();

const db = require("./database/main")
const authRoute = require("./routes/auth.route")

const app = express();

app.use("/api", authRoute)

app.use((req, res, next) => {
  res.status(200).send("Banking Home")
})

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
