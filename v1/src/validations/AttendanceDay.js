const Joi = require('joi')

//day value can be only 1...31
const createValidation = Joi.object({
  day: Joi.number().required(),
  employees: Joi.array().items(
    Joi.object({
      empId: Joi.string().required(),
      status: Joi.string().valid('holiday', 'timed', 'late').default('timed'),
    })
  ),
})

module.exports = {
  createValidation,
}
