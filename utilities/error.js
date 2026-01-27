const errorHandler = (statusCode, message) => {
  let err = new Error;
  err.statusCode = statusCode;
  err.message = message;
  return err;
};

module.exports = {errorHandler}
