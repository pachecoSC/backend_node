const express = require('express')

const config = require('../config.js')
const post = require('./components/post/network')
const errors = require('../network/errors')

const app = express()

// ROUTER
app.use('/api/post', post)

//seccion del error debe ser la ultima ruta
app.use(errors)

app.listen(config.post.port, () => {
  console.log('Api post escuchando en el puerto ', config.post.port)
})
