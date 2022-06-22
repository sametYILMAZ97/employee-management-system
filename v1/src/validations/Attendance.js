const Joi = require('joi')

const createValidation = Joi.object({
  year_month: Joi.date().required(),
  days: Joi.array().items(Joi.string()).required(),
})

module.exports = {
  createValidation,
}
