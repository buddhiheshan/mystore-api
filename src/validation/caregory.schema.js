const Joi = require("joi");

const Schema = {
  postCategory: Joi.object({
    name: Joi.string().min(1).max(45).required(),
  }),
  patchCategory: Joi.object({
    id: Joi.number().min(1).required(),
    name: Joi.string().min(1).max(45).required(),
  }),
  deleteCategory: Joi.object({
    id: Joi.number().min(1).required(),
  }),
};

module.exports = Schema;
