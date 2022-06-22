const Model = require('../models/AttendanceDay')

const select = async (id) => {
  return await Model.findById(id).populate('employees.empId')
}

const selectAll = async () => {
  return await Model.find({}).populate('employees.empId')
}

const insert = async (data) => {
  const instance = new Model(data)
  return await instance.save().populate('employees.empId')
}

const edit = async (id, data) => {
  console.log(id)
  data._id = id
  await Model.updateOne(data)
  return await Model.findOne(data).populate('employees.empId')
}

const remove = async (id) => {
  return await Model.deleteOne({ _id: id }).populate('employees.empId')
}

module.exports = {
  select,
  selectAll,
  insert,
  edit,
  remove,
}
