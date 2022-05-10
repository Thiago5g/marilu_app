const express = require("express");
const SignupClientController = require("../controllers/signupClient.controller");
// const permissions = require("../middlewares/permissions.js");

const routes = express.Router();

// routes.put("/", SignupClientController.update);

routes.post("/signupClient", SignupClientController.register )

// routes.get("/", permissions.typeStandard, permissions.havePermissions, ClientController.index )

module.exports = routes;
