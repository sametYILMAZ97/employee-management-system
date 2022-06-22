const httpstatus = require('http-status')
const {
  select,
  selectAll,
  insert,
  edit,
  remove,
  loginEmployee,
} = require('../services/EmployeeService')
const {
  createPasswordToHash,
  generateAccessToken,
} = require('../scripts/utils/auth')

const index = (req, res) => {
  selectAll().then((response) => {
    res.status(httpstatus.OK).send(
      response.map((u) => {
        const employee = u.toObject()
        delete employee.password
        return employee
      })
    )
  })
}

const show = (req, res) => {
  select(req.params.id).then((response) => {
    if (response) {
      const employee = response.toObject()
      delete employee.password
      return res.status(httpstatus.OK).send(employee)
    }
    response.status(httpstatus.NO_CONTENT)
  })
}

const store = (req, res) => {
  req.body.password = createPasswordToHash(req.body.password)
  insert(req.body)
    .then((response) => res.status(httpstatus.OK).send(response))
    .catch((error) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(error.message))
  // TODO: Add employee to admins employees array after the employee creation.
  // if (req.body.admin == null) {
  //   const admin = await AdminService.select(req.body.admin)
  //   const employee = await EmployeeService.select2(req.body.email)
  //   admin.employees.push(employee._id)
  //   await AdminService.edit(admin._id, admin)
  // }
}

const update = (req, res) => {
  edit(req.params.id, req.body)
    .then((response) => res.status(httpstatus.OK).send(response))
    .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e))
}

const destroy = (req, res) => {
  remove(req.params.id)
    .then((response) => res.status(httpstatus.NO_CONTENT).send(response))
    .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e))
}

const login = (req, res) => {
  loginEmployee(req.body)
    .then((response) => {
      if (response) {
        console.log(response)
        const employee = {
          ...response.toObject(),
          accessToken: generateAccessToken(response.toObject()),
        }
        delete employee.password
        delete employee.createdAt
        delete employee.updatedAt
        return res.status(httpstatus.OK).send(employee)
      }
      return res
        .status(httpstatus.UNAUTHORIZED)
        .send({ error: 'Invalid Credentials...' })
    })
    .catch((e) =>
      res.status(httpstatus.INTERNAL_SERVER_ERROR).send({ error: e })
    )
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  login,
}
