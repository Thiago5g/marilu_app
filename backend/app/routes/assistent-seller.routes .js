const express = require("express");
const assistentSellerCompany = require("../controllers/assistentSeller.controller");

const routes = express.Router();

routes.get("/", assistentSellerCompany.index);

module.exports = routes;
