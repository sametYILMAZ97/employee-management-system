const httpstatus = require('http-status')
const {
  select,
  selectAll,
  insert,
  edit,
  remove,
  loginAdmin,
} = require('../services/AdminService')
const {
  createPasswordToHash,
  generateAccessToken,
} = require('../scripts/utils/auth')

const index = (req, res) => {
  selectAll().then((response) => {
    res.status(httpstatus.OK).send(
      response.map((u) => {
        const admin = u.toObject()
        delete admin.password
        return admin
      })
    )
  })
}

const show = (req, res) => {
  select(req.params.id).then((response) => {
    if (response) {
      const admin = response.toObject()
      delete admin.password
      return res.status(httpstatus.OK).send(admin)
    }
    response.status(httpstatus.NO_CONTENT)
  })
}

const store = (req, res) => {
  req.body.password = createPasswordToHash(req.body.password)
  const token = generateAccessToken(req.body)
  insert(req.body)
    .then((response) => res.status(httpstatus.OK).send({ response, token }))
    .catch((e) => res.status(httpstatus.INTERNAL_SERVER_ERROR).send(e))
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
  loginAdmin(req.body)
    .then((response) => {
      if (response) {
        console.log(response)
        const admin = {
          ...response.toObject(),
          accessToken: generateAccessToken(response.toObject()),
        }
        delete admin.password
        delete admin.createdAt
        delete admin.updatedAt
        return res.status(httpstatus.OK).send(admin)
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
