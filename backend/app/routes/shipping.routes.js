const express = require('express')
const ShippingCompany = require('../controllers/shipping.controller')

const routes = express.Router()

routes.get('/', ShippingCompany.index ) 

module.exports = routes

