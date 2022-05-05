const express = require("express");
const SellerCompany = require("../controllers/seller.controller");

const routes = express.Router();

routes.get("/", SellerCompany.index);

module.exports = routes;
