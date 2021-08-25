const express = require('express')

const config = require('../config')
// const router = require('./network');

const app = express()
// app.use(express.json())

// RUTAS
app.use('/', router)

app.listen(config.cacheService.port, () => {
  console.log('Servicio de mysql escuchando en el puerto', config.cacheService.port)
})