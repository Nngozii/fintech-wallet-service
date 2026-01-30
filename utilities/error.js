const errorHandler = (statusCode, message) => {
  let err = new Error;
  err.statusCode = statusCode;
  err.message = message;
  let stack = err.stack;
  return err;
};

module.exports = errorHandler
