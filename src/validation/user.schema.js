const Joi = require("joi");

const Schema = {
  registerUser: Joi.object({
    firstName: Joi.string().alphanum().min(3).max(25).required(),
    lastName: Joi.string().alphanum().min(3).max(25).required(),
    email: Joi.string().email().required().max(255),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    address: Joi.string().required().max(255),
    mobile: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
  }),
  loginUser: Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().required(),
  }),
};

module.exports = Schema;
