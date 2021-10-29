const UnauthorizedException = require("../common/exceptions/UnauthorizedException");
const ForbiddenException = require("../common/exceptions/ForbiddenException");
const jwt = require("jsonwebtoken");
const env = require("../configs");
const User = require("../models/user.model");
const { getUserRoles, getUser } = require("../services/auth.service");

const AuthenticationMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new UnauthorizedException("Unauthorized! Please login to proceed.");
    const [method, token] = req.headers.authorization.split(" ");

    if (method !== "Bearer") throw new UnauthorizedException("Auth type invalid!");

    const decoded = jwt.verify(token, env.SECRET, (err, decoded) => {
      if (err) throw new UnauthorizedException("jwt malformed!");
      return decoded;
    });
    if (!(await getUser("id", decoded.user_id))) throw new UnauthorizedException("Unauthorized! Please login to proceed.");
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

const AuthorizathionMiddleware = (rolesAllowed) => async (req, res, next) => {
  try {
    // Get roles of the user
    const roles = await getUserRoles(req.user.user_id);

    // Check if the role is in the allowed roles
    const matchedRoles = roles.some((role) => rolesAllowed.includes(role));
    if (!matchedRoles) throw new ForbiddenException();

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { AuthenticationMiddleware, AuthorizathionMiddleware };
