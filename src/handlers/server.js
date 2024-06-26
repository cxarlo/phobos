const express = require('express')
const client = require('../client')
const logger = require('./logger')

const app = express()
const port = 3000

app.use(express.static('site'))
app.use('/assets', express.static('assets'))

app.listen(port, () =>
  logger.info(`Webserver running on https://localhost:${port}`)
)
