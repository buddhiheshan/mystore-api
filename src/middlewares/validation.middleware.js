const ValidationException = require("../common/exceptions/ValidationException");

const ValidationMiddleware = (schema) => async (req, res, next) => {
  try {
    const { error, value } = await schema.validate(req.body);
    if (error) throw new ValidationException(error);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { ValidationMiddleware };
