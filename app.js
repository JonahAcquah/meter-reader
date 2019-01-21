'use strict';

const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const metercontroller = require('./controllers/metercontroller')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/meter-read', metercontroller.getMeterReading)
app.post('/meter-read', metercontroller.postMeterReading)
app.get('/meter-read/:customerid/:meterid', metercontroller.getMeterReading)

app.all('*', (req, res) => { 
  res
  .status(400)
  .send({ data: null, message: 'Route not found!!' })
})

module.exports.handler = serverless(app)