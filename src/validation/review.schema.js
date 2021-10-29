const { number } = require("joi");
const Joi = require("joi");

const Schema = {
  postReview: Joi.object({
    customerId: Joi.number().min(0).required(),
    description: Joi.string().min(0).max(100),
    rating: Joi.number().min(0).max(5),
  }),
};

module.exports = Schema;
