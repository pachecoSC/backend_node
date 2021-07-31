const express = require('express')
const Controller = require('./index')
const response = require('../../../network/response')

const router = express.Router()

router.use(express.json())//es necesario para que los post,patch,delete obtengan el body correctamente.

// app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// rutas
router.get('/',list)
router.get('/:id',get)
router.put('/', insert)
router.patch('/',update)
router.delete('/',remove)

function list(req, res) {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}
function get (req, res) {
  Controller.get(req.params.id)
    .then((data) => {
      if (data !== null){
        response.success(req, res, data, 200)
      }else{
        response.success(req, res, 'El Usuario no existe', 404)
      }
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}
function insert (req, res) {
  Controller.insert(req.body)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}
function update(req, res) {
  Controller.update(req.body)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}
function remove(req, res) {
  Controller.remove(req.body)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

module.exports = router
