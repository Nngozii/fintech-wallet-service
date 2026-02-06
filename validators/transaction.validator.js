const Joi = require("joi");

exports.depositSchema = Joi.object({
  amount: Joi.number().positive().precision(2).min(50).required(),
});

exports.transferSchema = Joi.object({
  amount: Joi.number().positive().precision(2).min(50).required(),
  recipient: Joi.string().required()
});

exports.withdrawSchema = Joi.object({});
