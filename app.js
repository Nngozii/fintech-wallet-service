const express = require("express");
require("dotenv").config();

const db = require("./database/main");
const authRoute = require("./routes/auth.route");

const app = express();

app.use("/api", authRoute);

app.use("/", (req, res, next) => {
  res.status(200).send("Banking Home. Please Sign up or Log in");
});

app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success: false,
    "status code": statusCode,
    message: message 
  })
  next();
});

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
