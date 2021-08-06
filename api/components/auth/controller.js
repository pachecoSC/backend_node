const bcrypt = require('bcrypt')

const auth = require('../../../auth')
const TABLA = 'Auth'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  //zona de las funciones
  async function insert(data) {
    // if (!data.password) {

    // }

    const authData = {
      id: data.id,
      username: data.username,
      password: await bcrypt.hash(data.password, 5)
    }
    // en caso queramos agregar datos de forma independiente podemos usar esto.
    /* if (data.username) {
      authData.username = data.username
    } */

    return store.add(TABLA, authData)
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username })
    // return data
    // console.log('contraseña',data.password)
    //si data llega vacia va al chtch del network con error 400
    return bcrypt.compare(password, data.password)
            .then(res => {
                if (res === true) {
                    // Generar token;
                    return auth.sign({ ...data })
                } else {
                    throw new Error('Informacion invalida');
                }
            })
  }

  return {
    insert,
    login
  }
}
