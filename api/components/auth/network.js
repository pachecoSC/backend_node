const express = require('express')
const Controller = require('./index')
const response = require('../../../network/response')

const router = express.Router()

router.use(express.json())

//rutas
router.post('/login', login)

function login(req, res) {
  Controller.login(req.body.username, req.body.password)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, 'información invalida', 400)
    })
}

module.exports = router