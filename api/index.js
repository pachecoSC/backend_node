const express = require('express')
const swaggerUi = require('swagger-ui-express')

const config = require('../config.js')
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const errors = require('../network/errors')

const swaggerDoc = require('./swagger.json')

const app = express()

// ROUTER
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

//seccion del error debe ser la ultima ruta
app.use(errors)

app.listen(config.api.port, () => {
  console.log('Api escuchando en el puerto ', config.api.port)
})
