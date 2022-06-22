const Mongoose = require('mongoose')
const logger = require('../scripts/logger/Attendance')

const AttendanceSchema = new Mongoose.Schema(
  {
    year_month: {
      type: Date,
      required: true,
    },
    days: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'AttendanceDay',
      },
    ],
  },
  { versionKey: false, timestamps: true }
)

// ***Trigger*** before save
AttendanceSchema.pre('save', function (next) {
  var new_doc = this
  this.constructor.findById(this.id, function (err, original) {
    logger.log({
      level: 'info',
      message: new_doc,
    })
    next()
  })
})

module.exports = Mongoose.model('Attendance', AttendanceSchema)
