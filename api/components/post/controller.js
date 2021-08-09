const { nanoid } = require('nanoid') //para crear el id
const moment = require('moment')
const TABLA = 'Post'

module.exports = function (injectStore) {
  let store = injectStore
  if (!store) {
    require('../../../store/dummy')
  }

  async function list() {
    let res = await store.list(TABLA)
    // console.log('resultado', res)
    res.forEach(element => {
      element.fecha_creacion = moment(element.fecha_creacion).format('DD-MM-YYYY HH:mm:ss')
      if (element.fecha_modificacion!==null) {
        element.fecha_modificacion = moment(element.fecha_modificacion).format('DD-MM-YYYY HH:mm:ss')
      } else {
        element.fecha_modificacion =''
      }
      // console.log('1 +',element.fecha_creacion)
    });

    return res//store.list(TABLA)
  }
  async function insert(data) {
    const post = {
      contenido: data.contenido,
      autor: data.autor,
      fecha_creacion: moment().format('YYYY-MM-DD HH:mm:ss')//new Date()
    }
    if (!data.id) {
      post.id = nanoid()
    }

    return store.add(TABLA, post)
  }
  function update (data) {
    if (!data.fecha_modificacion) {
      data.fecha_modificacion = moment().format('YYYY-MM-DD HH:mm:ss')
    }
    return store.edit(TABLA, data)
  }
  function remove (data) {
    // console.log('body', data)
    return store.remove(TABLA, data.id)
  }

  async function postUser(user) {
    const join = {}
    join['User'] = 'autor' //se envia la key es la "tabla" y el valor es el "campo" son usadas para armar el join
    const query = { autor: user } //es el campo a buscar en el where

    return await store.query(TABLA, query, join)
  }

  return {
    list,
    insert,
    update,
    remove,
    postUser
  }
}
