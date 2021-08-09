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
      element.fecha_creacion = moment(element.fecha_creacion).format('YYYY-MM-DD HH:mm:ss')
      if (element.fecha_modificacion!==null) {
        element.fecha_modificacion = moment(element.fecha_modificacion).format('YYYY-MM-DD HH:mm:ss')
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

  return {
    list,
    insert
  }
}
