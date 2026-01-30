const Joi = require("joi");

exports.depositSchema = Joi.object({
  amount: Joi.number().positive().precision(2).min(50).required(),
});

exports.transferSchema = Joi.object({});

exports.withdrawSchema = Joi.object({});
