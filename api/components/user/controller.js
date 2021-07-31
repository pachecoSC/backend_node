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
  function insert(data) {
    return store.add(TABLA, data)
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
