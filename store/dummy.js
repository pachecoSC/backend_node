const db = {
  user: [
    { id: '1', nombre: 'chris', apellido: 'pacheco', edad: '28' },
    { id: '2', nombre: 'leonel', apellido: 'sarango', edad: '27' },
    { id: '3', nombre: 'beto', apellido: 'camacho', edad: '49' },
    { id: '4', nombre: 'patty', apellido: 'leon', edad: '49' }
  ]
}
let cod, msg

async function list (tabla) {
  let col = db[tabla]
  if (col.length > 0) {
    cod = '1'
    msg = 'se encontraron datos'
  } else {
    cod = '0'
    msg='No hay datos'
  }
  let obj = {
    cod_result: cod,
    message: msg,
    data:col
  }

  return obj
}

async function get(tabla, id) {
  let col = db[tabla]
  return col.filter((item) => item.id === id)[0] || null
}

async function add(tabla, data) {
  db[tabla].push(data)

  let col = db[tabla]
  let user = col.filter((item) => item.id === data.id)[0]

  if (user !== undefined) {
    cod = '1'
    msg = `se agrego de manera existosa el usuario ${data.nombre}`
  } else {
    cod = '0'
    msg = 'Error! no se pudo agregar'
  }

  let obj = {
    cod_result: cod,
    message: msg,
    data: col
  }

  return obj
}

async function edit(tabla, data) {
  let col = await list(tabla)
  let item = col.filter((item) => item.id === data.id)[0]
  // actualizar los datos
  if (item !== undefined) {
    item.nombre = data.nombre
    item.apellido = data.apellido
    item.edad = data.edad
    cod = '1'
    msg = 'edición exitosa'
  } else {
    cod = '0'
    msg = 'edicion fallida'
  }

  let obj = {
    cod_result: cod,
    message: msg,
    data: item
  }
  return obj
}

async function remove(tabla, data) {
  db[tabla].splice(Number(data.id) - 1, 1)
  // verificamos si existe en la lista
  let col = db[tabla]
  let user = col.filter((item) => item.id === data.id)[0]

  if (user !== undefined) {
    cod = '0'
    msg = 'Error, No se pudo eliminar'
  } else {
    cod = '1'
    msg = 'Eliminación satisfactoria'
  }

  let obj = {
    cod_result: cod,
    message: msg,
    data: col
  }
  return obj
}

module.exports = {
  list,
  get,
  add,
  edit,
  remove
}
