const ApiException = require("./ApiException");

class UnauthorizedException extends ApiException {
  constructor(error) {
    super("Unauthorized!", "Invalid email or password!", 401, error);
  }
}

module.exports = UnauthorizedException;
