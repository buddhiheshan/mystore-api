const { createUser, generateHash } = require("../services/auth.service");

const ApiException = require("../common/exceptions/ApiException");

const userLoginHandler = async (req, res, next) => {
  try {
    res.json(req.body);
  } catch (error) {}
};

const userRegisterHandler = (role) => async (req, res, next) => {
  // res.json(req.body);
  try {
    const user = await createUser(role, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLoginHandler,
  userRegisterHandler,
};
