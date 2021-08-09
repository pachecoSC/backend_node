const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.use(express.json())
// rutas
router.get('/', list)
router.put('/', insert)

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

module.exports = router

//obtener la fecha actual
// console.log('fecha_actual', new Date())
