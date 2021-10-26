class ApiException extends Error {
  statusCode;
  message;
  description;
  errors;

  constructor(message, description, statusCode, errors) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.description = description;
    this.errors = errors;
  }
}

module.exports = ApiException;
