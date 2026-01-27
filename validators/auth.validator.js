const Joi = require("joi")

exports.signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
  confirmPassword: Joi.ref("password")
})

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
})