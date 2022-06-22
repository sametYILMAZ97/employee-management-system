const Joi = require('joi')

const createValidation = Joi.object({
  date: Joi.date().required(),
  name: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    // i am limited password because we will hash the password,
    // if password is too long we cant hash it because 255 is max length of a string
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,10}$')),
  status: Joi.string().valid('active', 'inactive').default('active'),
  phone: Joi.array().items(
    Joi.string()
      .required()
      .pattern(new RegExp('^(5)([0-9]{2})([0-9]{3})s?([0-9]{2})s?([0-9]{2})$'))
  ),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.string().pattern(new RegExp('^[0-9]{5}$')),
  }),
  salaries: Joi.array().items(Joi.string()),
  admin: Joi.string(),
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
