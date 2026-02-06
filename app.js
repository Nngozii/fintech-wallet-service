const express = require("express");
require("dotenv").config();
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")

const db = require("./database/main");
const authRoute = require("./routes/auth.route");
const transactionRoute = require("./routes/transaction.route")

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "We have received too many request. Please try again after 15 mins", // Message to display after limit reached
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})

// Apply the rate limiting middleware to all requests.
app.use("/api", limiter)

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", transactionRoute)
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
  let stack = err.stack
  return res.status(statusCode).json({
    success: false,
    "status code": statusCode,
    message: message,
    stack: stack
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
