const express = require("express");
require("dotenv").config();

const db = require("./database/main");
const authRoute = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoute);

app.use("/", (req, res, next) => {
  res.status(200).send("Banking Home. Please Sign up or Log in");
});

//Middleware to handle Joi validation error
app.use(((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString()
    });
  } else {
    // pass on to another error handler
    next(err);
     }
}))

app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    "status code": statusCode,
    message: message,
  });
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

app.listen(port, () => {
  console.log("Successfully connected to server");
});
