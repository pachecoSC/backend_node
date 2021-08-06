const express = require('express')
const Controller = require('./index')
const response = require('../../../network/response')

const router = express.Router()

router.use(express.json())

//rutas
router.post('/login', login)

function bindRespuesta(cod, msg, data) {
  let res

  res = {
    cod_resul: cod,
    msg: msg,
    result: data
  }

  return res
}

function login(req, res) {
  let obj
  Controller.login(req.body.username, req.body.password)
    .then((data) => {
      obj =
        data.length > 0
          ? bindRespuesta(1, 'bienvenido', data)
          : bindRespuesta(0, 'contraseña incorrecta', undefined) // este caso no deberia pasar nunca.

      response.success(req, res, obj, 200)
    })
    .catch((err) => {
      // console.log(err)
      response.error(req, res, 'información invalida', 400)
    })
}

module.exports = router
