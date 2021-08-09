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

function get(table,id) {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM  ${table} WHERE id='${id}'`, (err, data) => {
      if (err) return reject(err)

      resolve(data)
    })
  })
}

function add (table, data) {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO ${table} SET?`, data,(err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
function edit (table, data) {
  return new Promise((resolve, reject) => {
    conn.query(`UPDATE ${table} SET? WHERE id=?`, [data,data.id],(err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

function query (table, query, join) {

  let joinQuery = ''
  if (join) {
    // console.log('0',join)
    const key = Object.keys(join)[0]
    const val = join[key]
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    // console.log('1',joinQuery)
  }
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM  ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
      if (err) return reject(err)
      // resolve(result)
      if (join) {
        resolve(res || null)
      } else {
        resolve(res[0] || null)
      }
    })
  })
}

function remove (table, id) {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM  ${table} WHERE id='${id}'`, (err, res) => {
      if (err) return reject(err)

      resolve(res)
    })
  })
}

module.exports = {
  list,
  get,
  add,
  edit,
  query,
  remove
}