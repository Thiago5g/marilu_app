const express = require('express')
const ProductController = require('../controllers/product.controller')
const routes = express.Router()

routes.get('/:tableProduct', ProductController.index ) 

module.exports = routes