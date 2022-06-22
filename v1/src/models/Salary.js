const Mongoose = require('mongoose')
const logger = require('../scripts/logger/Salary')

const SalarySchema = new Mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    employee: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    month: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ['basic', 'bonus'],
      default: 'basic',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

// ***Trigger*** before save
SalarySchema.pre('save', function (next) {
  var new_doc = this
  this.constructor.findById(this.id, function (err, original) {
    logger.log({
      level: 'info',
      message: new_doc,
    })
    next()
  })
})

module.exports = Mongoose.model('Salary', SalarySchema)
