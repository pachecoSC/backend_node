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
router.patch('/', secure('update'), update)
router.delete('/', remove)

function bindRespuesta(cod, msg, data) {
  let res

  res = {
    cod_resul: cod,
    msg: msg,
    result: data
  }

  return res
}

function list(req, res, next) {
  let obj
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
function get(req, res, next) {
  let obj
  Controller.get(req.params.id)
    .then((data) => {
      if (data.length > 0) {
        obj = bindRespuesta(1, '', data)
        response.success(req, res, obj, 200)
      } else {
        obj = bindRespuesta(0, 'No se encontraron datos', data)
        response.success(req, res, 'obj', 200)
      }
    })
    .catch(next)
}

function insert(req, res, next) {
  let obj
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
  let obj
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
  Controller.remove(req.body.id)
    .then((data) => {
      obj =
        data.affectedRows > 0
          ? bindRespuesta(1, 'Eliminación exitosa', undefined)
          : bindRespuesta(0, 'Eliminación fallida', undefined)

      response.success(req, res, obj, 200)
    })
    .catch(next)
}

module.exports = router
