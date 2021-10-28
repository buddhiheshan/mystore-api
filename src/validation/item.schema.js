const Joi = require("joi");

const Schema = {
  postItem: Joi.object({
    name: Joi.string().min(1).max(45).required(),
    category: Joi.number().required(),
    skus: Joi.array()
      .items({
        price: Joi.number().min(0).required(),
        quantity: Joi.number().min(0).required(),
        discount: Joi.number().min(0).max(100),
        features: Joi.object().required(),
      })
      .required(),
  }),
};

module.exports = Schema;
