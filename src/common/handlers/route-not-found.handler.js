const RouteNotFoundException = require("../exceptions/RouteNotFoundException");

const RouteNotFoundHandler = (req, res, next) => {
  const error = new RouteNotFoundException();
  next(error);
};

module.exports = RouteNotFoundHandler;
