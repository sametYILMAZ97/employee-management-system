const Model = require('../models/Salary')

const select = async (id) => {
  return await Model.findById(id).populate('employee')
}

const selectAll = async () => {
  return await Model.find({}).populate('employee')
}

const insert = async (data) => {
  const instance = new Model(data)
  return await instance.save().populate('employee')
}

const edit = async (id, data) => {
  console.log(id)
  data._id = id
  await Model.updateOne(data)
  return await Model.findOne(data).populate('employee')
}

const remove = async (id) => {
  return await Model.deleteOne({ _id: id }).populate('employee')
}

module.exports = {
  select,
  selectAll,
  insert,
  edit,
  remove,
}
