const express = require("express");
const ClientController = require("../controllers/client.controller");
// const permissions = require("../middlewares/permissions.js");

const routes = express.Router();

routes.get("/", ClientController.index);

// routes.get("/", permissions.typeStandard, permissions.havePermissions, ClientController.index )

module.exports = routes;
