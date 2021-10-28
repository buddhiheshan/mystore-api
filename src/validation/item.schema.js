const Joi = require("joi");

const Schema = {
  postItem: Joi.object({
    name: Joi.string().min(1).max(45).required(),
    category: Joi.stiring().required(),
  }),
};

module.exports = Schema;
