const Model = require('../models/Admin')
const { createPasswordToHash } = require('../scripts/utils/auth')

const select = async (id) => {
  return await Model.find({ _id: id }).populate({
    path: 'employees',
    populate: {
      path: 'salaries',
    },
  })
}

const selectAll = async () => {
  return await Model.find({}).populate({
    path: 'employees',
    populate: {
      path: 'salaries',
    },
  })
}

const insert = async (data) => {
  const instance = new Model(data)
  return await instance.save().populate({
    path: 'employees',
    populate: {
      path: 'salaries',
    },
  })
}

const edit = async (id, data) => {
  console.log(id)
  data._id = id
  await Model.updateOne(data)
  return await Model.findOne(data).populate({
    path: 'employees',
    populate: {
      path: 'salaries',
    },
  })
}

const remove = async (id) => {
  return await Model.deleteOne({ _id: id }).populate({
    path: 'employees',
    populate: {
      path: 'salaries',
    },
  })
}

const loginAdmin = async (data) => {
  return await Model.findOne({
    email: data.email,
    password: createPasswordToHash(data.password),
  }).populate({
    path: 'employees',
    populate: {
      path: 'salaries',
    },
  })
}

module.exports = {
  select,
  selectAll,
  insert,
  edit,
  remove,
  loginAdmin,
}
