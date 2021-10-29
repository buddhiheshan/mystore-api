const { createUser, getUser, patchUser } = require("../services/auth.service");
const UnauthorizedException = require("../common/exceptions/UnauthorizedException");
const bcrypt = require("bcrypt");

const ApiException = require("../common/exceptions/ApiException");
const jwt = require("jsonwebtoken");
const env = require("../configs");
const ConflictException = require("../common/exceptions/ConflictException");
const ValidationException = require("../common/exceptions/ValidationException");

const userRegisterHandler = (role) => async (req, res, next) => {
  try {
    // Check if the user exists
    if (await getUser("email", req.body.email)) throw new ConflictException("A user already exist with the given email!");
    if (await getUser("mobile", req.body.mobile)) throw new ConflictException("A user already exist with the given mobile!");

    // Create user
    user = await createUser(role, req.body);

    res.status(201).json({
      message: `${role} created successfully.`,
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const userLoginHandler = async (req, res, next) => {
  try {
    // Get the user from database
    const user = await getUser("email", req.body.email);

    // Check if the user exits
    if (!user) throw new UnauthorizedException("Invalid email or password!");

    // Check if the password match
    if (!(await bcrypt.compare(req.body.password, user.password))) throw new UnauthorizedException("Invalid email or password!");

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

const patchUserHandler = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) throw new ValidationException([{ message: "No data to modify!" }]);
    const user = await patchUser(req.user.user_id, req.body);

    res.status(201).json({
      message: `User updated!`,
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUserDetailsHandler = async (req, res, next) => {
  try {
    const data = await getUser("id", req.user.user_id);
    res.status(201).json({
      message: `User updated!`,
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLoginHandler,
  userRegisterHandler,
  patchUserHandler,
  getUserDetailsHandler,
};
