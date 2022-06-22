const Joi = require('joi')

const createValidation = Joi.object({
  date: Joi.date().required(),
  employee: Joi.string().required(),
  salary: Joi.number().required(),
  month: Joi.date().required(),
  type: Joi.string().valid('basic', 'bonus').default('basic'),
})

module.exports = {
  createValidation,
}
