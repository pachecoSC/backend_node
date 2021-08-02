const { nanoid } = require('nanoid')
const auth = require('../auth')
const TABLA = 'user'

module.exports = function (injectStore) {
  let store = injectStore
  if (!store) {
    require('../../../store/dummy')
  }
  function list() {
    return store.list(TABLA)
  }
  function get(id) {
    return store.get(TABLA, id)
  }
  async function insert(data) {
    const user = {
      username: data.username,
      nombre: data.nombre,
      apellido: data.apellido,
      edad: data.edad
    }
    if (!data.id) {
      user.id = nanoid()
    }
    if (data.username || data.password) {
      await auth.insert({
        id: user.id,
        username: user.username,
        password: data.password
      })
    }

    return store.add(TABLA, user)
  }
  function update(data) {
    return store.edit(TABLA, data)
  }
  function remove(id) {
    return store.remove(TABLA, id)
  }

  return {
    list,
    get,
    insert,
    update,
    remove
  }
}

// ejemplo de uso inicio
/* const store = require('../../../store/dummy')

const TABLA = 'user'

function listar () {
  return store.list(TABLA)
}

module.exports = {
  listar,
} */
