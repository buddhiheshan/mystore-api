const {
  wrapError,
  DBError,
  UniqueViolationError,
  NotNullViolationError,
} = require("db-errors");

const ExceptionHandler = (error, req, res, next) => {
  console.log(error);
  error = wrapError(error);

  const isServerError =
    error.statusCode >= 500 ||
    error instanceof DBError ||
    error instanceof UniqueViolationError ||
    error instanceof NotNullViolationError;
  const message = !isServerError ? error.message : "Unknown Error!";
  const description = !isServerError
    ? error.description
    : "Unknown Error Occured! Please try again in some time.";
  const statusCode = !isServerError ? error.statusCode : 500;

  const responseObject = {
    success: false,
    message,
    description,
    statusCode,
    timestamp: new Date(),
    errors: error.errors,
  };
  res.status(statusCode).json(responseObject);
};

module.exports = ExceptionHandler;
