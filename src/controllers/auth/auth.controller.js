const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../../configs");
const UnauthorizedException = require("../../common/exceptions/UnauthorizedException");
const ConflictException = require("../../common/exceptions/ConflictException");
const ValidationException = require("../../common/exceptions/ValidationException");
const getAuthService = require("../../services/auth/auth.service.injection");
class AuthController {
  constructor() {
    this.authService = getAuthService();
  }

  userRegisterHandler(role) {
    return async (req, res, next) => {
      try {
        // Check if the user exists
        if (await this.authService.getUser("email", req.body.email))
          throw new ConflictException(
            "A user already exist with the given email!"
          );
        if (await this.authService.getUser("mobile", req.body.mobile))
          throw new ConflictException(
            "A user already exist with the given mobile!"
          );

        // Create user
        let user = await this.authService.createUser(role, req.body);

        res.status(201).json({
          message: `${role} created successfully.`,
          success: true,
          data: user,
        });
      } catch (error) {
        next(error);
      }
    };
  }
  userLoginHandler() {
    return async (req, res, next) => {
      try {
        // Get the user from database
        const user = await this.authService.getUser("email", req.body.email);

        // Check if the user exits
        if (!user)
          throw new UnauthorizedException("Invalid email or password!");
        // Check if the password match
        if (!(await this.authService.comparePassword(req.body.password, user.password)))
          throw new UnauthorizedException("Invalid email or password!");

        // Generate jwt token
        const token = jwt.sign({ user_id: user.id }, env.SECRET, {
          expiresIn: env.TOKEN_VALIDITY,
        });
        const roles = user.roles.map((role) => role.name);
        const data = {
          firstName: user.firstName,
          lastName: user.lastName,
          roles,
        };

        res.status(200).json({
          message: `Login successful for the user ${user.email}`,
          success: true,
          token: token,
          expiresIn: env.TOKEN_VALIDITY,
          data,
        });
      } catch (error) {
        next(error);
      }
    };
  }
  patchUserHandler() {
    return async (req, res, next) => {
      try {
        if (Object.keys(req.body).length === 0)
          throw new ValidationException([{ message: "No data to modify!" }]);
        const user = await this.authService.patchUser(
          req.user.user_id,
          req.body
        );

        res.status(201).json({
          message: `User updated!`,
          success: true,
          data: user,
        });
      } catch (error) {
        next(error);
      }
    };
  }
  getUserDetailsHandler() {
    return async (req, res, next) => {
      try {
        const data = await this.authService.getUser("id", req.user.user_id);
        res.status(200).json({
          message: `User updated!`,
          success: true,
          data,
        });
      } catch (error) {
        next(error);
      }
    };
  }
}

module.exports = AuthController;
