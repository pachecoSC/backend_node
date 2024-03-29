const { nanoid } = require('nanoid')
const auth = require('../auth')
const TABLA = 'User'

module.exports = function (injectStore) {
  let store = injectStore
  // console.log('store', store)
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
  function follow(from, to) {
    return store.add(TABLA + '_follow', {
      user_from: from,
      user_to: to
    })
  }
  async function following(user) {
    const join = {}
    join[TABLA] = 'user_to' //{user: 'user_to'}
    const query = { user_from: user }

    return await store.query(TABLA + '_follow', query, join)
  }

  return {
    list,
    get,
    insert,
    update,
    remove,
    follow,
    following
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
