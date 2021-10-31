const ApiException = require("./ApiException");

// export const RouteNotFoundExceptionType = "ROUTE_NOT_FOUND";

class ValidationException extends ApiException {
  constructor(errors) {
    const validationSanitized = errors.map((err) => {
      return err.message;
    });
    super("Bad Request!", "One or more field can not be processed!", 400, validationSanitized[0]);
  }
}

module.exports = ValidationException;
