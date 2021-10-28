const UnauthorizedException = require("../common/exceptions/UnauthorizedException");
const ForbiddenException = require("../common/exceptions/ForbiddenException");
const jwt = require("jsonwebtoken");
const env = require("../configs");
const User = require("../models/user.model");
const { getUserRoles } = require("../services/auth.service");

const AuthenticationMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new UnauthorizedException("Unauthorized! Please login to proceed.");
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, env.SECRET, (err, decoded) => {
      if (err) throw new UnauthorizedException("Unauthorized! Please login to proceed.");
      return decoded;
    });
    req.user = decoded;
    console.log(req.user);
    // !! WHy check in db

    next();
  } catch (error) {
    next(error);
  }
};

const AuthorizathionMiddleware = (rolesAllowed) => async (req, res, next) => {
  try {
    // Get roles of the user
    const roles = await getUserRoles(req.user.user_id);
    // ! CHeck logic
    // Check is the role is in the allowed roles
    const matchedRoles = roles.filter((role) => rolesAllowed.includes(role));
    if (!matchedRoles.length) throw new ForbiddenException();

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { AuthenticationMiddleware, AuthorizathionMiddleware };
