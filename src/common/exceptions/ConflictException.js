const ApiException = require("./ApiException");

class ConflictException extends ApiException {
  constructor(error) {
    super("Conflict!", "Server state deos not match!", 409, error);
  }
}

module.exports = ConflictException;
