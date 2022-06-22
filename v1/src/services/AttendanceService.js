const Model = require('../models/Attendance')

const select = async (id) => {
  return await Model.findById(id).populate('days')
}

const selectAll = async () => {
  return await Model.find({}).populate('days')
}

const insert = async (data) => {
  const instance = new Model(data)
  return await instance.save().populate('days')
}

const edit = async (id, data) => {
  console.log(id)
  data._id = id
  await Model.updateOne(data)
  return await Model.findOne(data).populate('days')
}

const remove = async (id) => {
  return await Model.deleteOne({ _id: id }).populate('days')
}

module.exports = {
  select,
  selectAll,
  insert,
  edit,
  remove,
}
