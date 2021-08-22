const express = require('express')
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')

const response = require('../network/response')
const Store = require('../store/mysql')

const router = express.Router()

// router.use(express.json())

router.get('/:table', list)
router.get('/:table/:id', get)
router.put('/:table', insert)
router.patch('/:table', update)
router.delete('/:table', remove)

function bindRespuesta(cod, msg, data) {
  let res = {
    cod_resul: cod,
    msg: msg,
    result: data
  }

  return res
}
function  insertAuth(user, pass) {
  if (user.username || pass) {
    const authData ={
      id: user.id,
      username: user.username,
      password: bcrypt.hash(pass, 5)
    }
    // * enviamos al store para la insercion
    Store.add('Auth', authData)
  }
}

function list(req, res, next) {
  Store.list(req.params.table)
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
// * ejemplo de otra manera de trabajar (forma asincrona).
/* async function list(req, res, next) {
  const data = await Store.list(req.params.table)
  if (!data) {
    next()
  } else {
    if (data.length > 0) {
      obj = bindRespuesta(1, '', data)
      response.success(req, res, obj, 200)
    } else {
      obj = bindRespuesta(0, 'No se encontraron datos', data)
      response.success(req, res, 'obj', 200)
    }
  }
} */

function get (req, res, next) {
  Store.get(req.params.table, req.params.id)
    .then((data) => {
      // console.log('data get',data)
      if (data.RowDataPacket!== undefined) {
        obj = bindRespuesta(1, '', data)
        response.success(req, res, obj, 200)
      } else {
        obj = bindRespuesta(0, 'No se encontraron datos', data)
        response.success(req, res, obj, 200)
      }
    })
    .catch(next)
}

function insert (req, res, next) {
  // * armar los dos objetos a enviar en las diferentes tablas, user y auth
  // ? por defecto la req.params.table viene como "user"
  const user = {
    username: req.body.username,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad
  }
  if (!req.body.id) {
    user.id = nanoid()
  }

  insertAuth(user, req.body.password) // * insercion de autenticacion

  Store.add(req.params.table, user)
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
// ! faltaria agregar la funcionalidad secure
function update(req, res, next) {
  Store.update(req.body)
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
  Store.remove(req.body.id)
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
