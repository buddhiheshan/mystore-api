const ApiException = require("./ApiException");

class ForbiddenException extends ApiException {
  constructor(error) {
    super("Forbidden!", "You do not have access rights to this content!", 403, error);
  }
}

module.exports = ForbiddenException;
