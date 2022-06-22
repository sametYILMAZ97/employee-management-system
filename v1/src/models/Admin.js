const Mongoose = require('mongoose')
const logger = require('../scripts/logger/Admin')

const AdminSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    categories: {
      type: String,
      enum: ['HeadManager', 'Manager', 'AssistantManager'],
    },
  },
  { versionKey: false, timestamps: true }
)

// ***Trigger*** before save
AdminSchema.pre('save', function (next) {
  var new_doc = this
  this.constructor.findById(this.id, function (err, original) {
    logger.log({
      level: 'info',
      message: new_doc,
    })
    next()
  })
})

module.exports = Mongoose.model('Admin', AdminSchema)
