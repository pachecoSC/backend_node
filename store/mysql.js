const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

//conect

let conn

function handeCon() {
  conn = mysql.createConnection(dbconfig)

  conn.connect((err) => {
    if (err) {
      // en el caso de error
      console.error('[db err]', err)
      setTimeout(handeCon, 2000)
    } else {
      console.log('[db connect]')
    }
  })

  conn.on('error', (err) => {
    console.error('[db err]', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handeCon()
    } else {
      throw err
    }
  })
}

handeCon()

function list(table) {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM  ${table} `, (err, data) => {
      if (err) return reject(err)

      resolve(data)
    })
  })
}

module.exports = {
  list
}