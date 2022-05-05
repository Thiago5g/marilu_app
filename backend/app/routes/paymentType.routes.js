const express = require('express')
const PaymentController = require('../controllers/paymentType.controller')

const routes = express.Router()

routes.get('/', PaymentController.index ) 

module.exports = routes

