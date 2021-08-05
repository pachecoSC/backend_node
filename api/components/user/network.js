const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.use(express.json()) //es necesario para que los post,patch,delete obtengan el body correctamente.

// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// rutas
router.get('/', list)
router.get('/:id', get)
router.put('/', insert)
router.patch('/',secure('update'), update)
router.delete('/', remove)

function list(req, res) {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(err => {
      next()
    })
}
function get(req, res) {
  Controller.get(req.params.id)
    .then((data) => {
      if (data !== null) {
        response.success(req, res, data, 200)
      } else {
        response.success(req, res, 'El Usuario no existe', 404)
      }
    })
    .catch(err => {
      next()
    })
}
function insert(req, res) {
  Controller.insert(req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(err => {
      next()
    })
}
function update(req, res) {
  Controller.update(req.body)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(err => {
      next()
    })
}
function remove(req, res) {
  Controller.remove(req.body)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(err => {
      next()
    })
}

module.exports = router
