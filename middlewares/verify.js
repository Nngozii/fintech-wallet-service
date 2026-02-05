const jwt = require("jsonwebtoken");
require("dotenv").config();

const errorHandler = require("../utilities/error");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.authorization;

  if(!authHeader){
    return next(errorHandler(401, "Please Sign up or Log in"))
  }

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    try {
      let decode = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = decode;
      console.log(req.user);
      next();
    } catch (err) {
      next(
        errorHandler(
          401,
          "Token is invalid or expired. Log in to generate a new token",
        ),
      );
    }
  } else {
    next(errorHandler(400, "Bad Request"));
  }
};

module.exports = verifyToken;
