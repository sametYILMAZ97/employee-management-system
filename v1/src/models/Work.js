const Mongoose = require('mongoose')
const logger = require('../scripts/logger/Work')

const WorkSchema = new Mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
      enum: ['basic', 'other'],
      default: 'basic',
    },
    employee: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
  },
  { versionKey: false, timestamps: true }
)

// ***Trigger*** before save
WorkSchema.pre('save', function (next) {
  var new_doc = this
  this.constructor.findById(this.id, function (err, original) {
    logger.log({
      level: 'info',
      message: new_doc,
    })
    next()
  })
})

module.exports = Mongoose.model('Work', WorkSchema)
