const bcrypt = require('bcrypt')

const auth = require('../../../auth')
const TABLA = 'auth'

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
    let cod, msg, token
    //si data llega vacia va al chtch del network con error 400
    return bcrypt.compare(password, data.password)
      .then((res) => {
        if (res) {
          token = auth.sign(data)
          cod = '1'
          msg = 'usuario logeado'
        } else {
          cod = '0'
          msg = 'contraseña erronea'
        }

        let obj = {
          cod_result: cod,
          message: msg,
          token: token
          // data: data //datos de usuario y contrasña no se deben regresar con el login.
        }
        return obj
      })
      .catch((error) => {
        // console.error('Ups!', error.message)
        throw new Error('Información invalida')
      })
  }

  return {
    insert,
    login
  }
}
