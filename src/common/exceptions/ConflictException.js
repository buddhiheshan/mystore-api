const ApiException = require("./ApiException");

class ConflictException extends ApiException {
  constructor(error) {
    super("Conflict!", "Resource you are tryig to create already exist!", 409, error);
  }
}

module.exports = ConflictException;
