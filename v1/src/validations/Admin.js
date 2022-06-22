const Joi = require('joi')

const createValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,10}$')),
  employees: Joi.array().items(Joi.string),
  categories: Joi.string()
    .valid('HeadManager', 'Manager', 'AssistantManager')
    .required(),
})

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,10}$')),
})

module.exports = {
  createValidation,
  loginValidation,
}
