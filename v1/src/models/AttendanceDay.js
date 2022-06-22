const Mongoose = require('mongoose')
const logger = require('../scripts/logger/AttendanceDay')

const AttendanceDaySchema = new Mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    employees: [
      {
        empId: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'Employee',
          required: true,
        },
        status: {
          type: String,
          enum: ['holiday', 'timed', 'late'],
          default: 'timed',
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
)

// ***Trigger*** before save
AttendanceDaySchema.pre('save', function (next) {
  var new_doc = this
  this.constructor.findById(this.id, function (err, original) {
    logger.log({
      level: 'info',
      message: new_doc,
    })
    next()
  })
})

module.exports = Mongoose.model('AttendanceDay', AttendanceDaySchema)
