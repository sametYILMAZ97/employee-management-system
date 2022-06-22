const express = require('express')
const router = express.Router()
const {
  index,
  show,
  store,
  update,
  destroy,
  login,
} = require('../controllers/WorkController')
const validate = require('../middlewares/validate')
const schemas = require('../validations/Work')
const authenticaToken = require('../middlewares/authenticate')

router.route('/').get(authenticaToken, index)
router.route('/:id').get(authenticaToken, show)
router.route('/').post(validate(schemas.createValidation), store)
router.route('/:id').put(authenticaToken, update)
router.route('/:id').delete(authenticaToken, destroy)

module.exports = router
