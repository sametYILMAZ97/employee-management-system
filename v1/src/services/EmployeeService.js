const Model = require('../models/Employee')
const { createPasswordToHash } = require('../scripts/utils/auth')

const select = async (id) => {
  return await Model.find({ _id: id }).populate('salaries')
}

const select2 = async (data) => {
  return await Model.findOne({ data }).populate('salaries')
}

const selectAll = async () => {
  return await Model.find({}).populate('salaries')
}

const insert = async (data) => {
  const instance = new Model(data)
  return await instance.save()
}

const edit = async (id, data) => {
  console.log(id)
  data._id = id
  await Model.updateOne(data)
  return await Model.findOne(data).populate('salaries')
}

const remove = async (id) => {
  return await Model.deleteOne({ _id: id }).populate('salaries')
}

const loginEmployee = async (data) => {
  return await Model.findOne({
    email: data.email,
    password: createPasswordToHash(data.password),
  })
    .populate('salaries')
    .populate('admin')
}

module.exports = {
  select,
  selectAll,
  insert,
  edit,
  remove,
  loginEmployee,
}
