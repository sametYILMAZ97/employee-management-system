const Joi = require('joi')

const createValidation = Joi.object({
  date: Joi.date().required(),
  quantity: Joi.number(),
  price: Joi.number(),
  category: Joi.string().valid('basic', 'other').default('basic'),
  employee: Joi.array().items(Joi.string()),
})

module.exports = {
  createValidation,
}
