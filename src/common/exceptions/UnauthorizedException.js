const ApiException = require("./ApiException");

class UnauthorizedException extends ApiException {
  constructor(error) {
    super("Unauthorized!", "You must authenticate to get the requested resource.", 401, error);
  }
}

module.exports = UnauthorizedException;
