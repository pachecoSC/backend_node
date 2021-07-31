const express = require('express')
const Controller = require('./index')
const response = require('../../../network/response')

const router = express.Router()

// rutas
router.get('/',list)
router.get('/:id',get)
router.get('/insert/:id/:nombre/:apellido/:edad',insert)
router.get('/update/:id/:nombre/:apellido',update)
router.get('/remove/:id',remove)

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
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}
function insert (req, res) {
  let param = {
    id: req.params.id.toString(),
    nombre: req.params.nombre,
    apellido: req.params.apellido,
    edad: req.params.edad.toString()
  }

  // console.log(param)
  Controller.insert(param)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}
function update(req, res) {
  let param = {
    id: req.params.id,
    nombre: req.params.nombre,
    apellido: req.params.apellido
  }
  Controller.update(param)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}
function remove(req, res) {
  Controller.remove(req.params.id)
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
}

module.exports = router
