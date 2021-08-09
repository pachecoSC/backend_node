const express = require('express')
const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.use(express.json())
// rutas
router.get('/', list)
router.put('/', insert)
router.patch('/', secure('update'), update)
router.delete('/', secure('remove'), remove)
router.get('/postUser/:id', postUser)

let obj

function bindRespuesta(cod, msg, data) {
  let res = {
    cod_resul: cod,
    msg: msg,
    result: data
  }

  return res
}

function list(req, res, next) {
  Controller.list()
    .then((data) => {
      if (data.length > 0) {
        obj = bindRespuesta(1, '', data)
        response.success(req, res, obj, 200)
      } else {
        obj = bindRespuesta(0, 'No se encontraron datos', data)
        response.success(req, res, obj, 200)
      }
    })
    .catch(next)
}
function insert(req, res, next) {
  Controller.insert(req.body)
    .then((data) => {
      obj =
        data.affectedRows > 0
          ? bindRespuesta(1, 'Registro exitoso', undefined)
          : bindRespuesta(0, 'Registro fallido', undefined)
      // obj = bindRespuesta(1, 'registro exitoso', data)
      response.success(req, res, obj, 201)
    })
    .catch(next)
}
function update(req, res, next) {
  Controller.update(req.body)
    .then((data) => {
      obj =
        data.affectedRows > 0
          ? bindRespuesta(1, 'Edición exitosa', undefined)
          : bindRespuesta(0, 'Edición fallida', undefined)

      response.success(req, res, obj, 200)
    })
    .catch(next)
}
function remove(req, res, next) {
  Controller.remove(req.body)
    .then((data) => {
      obj =
        data.affectedRows > 0
          ? bindRespuesta(1, 'Eliminación exitosa', undefined)
          : bindRespuesta(0, 'Eliminación fallida', undefined)

      response.success(req, res, obj, 200)
    })
    .catch(next)
}
function postUser(req, res, next) {
  Controller.postUser(req.params.id)
    .then((data) => {
      return response.success(req, res, data, 200)
    })
    .catch(next)
}

module.exports = router

//obtener la fecha actual
// console.log('fecha_actual', new Date())
