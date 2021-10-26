const ExceptionHandler = (error, req, res, next) => {
  const message = error.statusCode !== 500 ? error.message : "Unknown Error!";
  const description = error.statusCode !== 500 ? error.description : "Unknown Error Occured! Please try again in some time.";

  const responseObject = {
    success: false,
    message,
    description,
    statusCode: error.statusCode,
    timestamp: new Date(),
    errors: error.errors,
  };
  res.status(error.statusCode).json(responseObject);
};

module.exports = ExceptionHandler;
