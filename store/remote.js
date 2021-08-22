const request = require('request')

function createRemoteDB(host, port) {
  const URL = 'http://' + host + ':' + port

  function list(table) {
    // * funcionalidad de listado
    return req('GET', table)
  }

  function get(table, id) {
    return req('GET', table, id)
  }

  function req (method, table, data) {
    // let url = URL + '/' + table
    let url = (!data && method === 'GET') ? URL + '/' + table : URL + '/' + table + '/' + data
    body = ''

    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            'content-type': 'aplication/json'
          },
          url,
          body
        },
        (err, req, body) => {
          if (err) {
            console.log('error:', err)
            reject(err.message)
          }
          const resp = JSON.parse(body)

          return resolve(resp.body)
        }
      )
    })
  }
  return {
    list,
    get
  }
}

module.exports = createRemoteDB
