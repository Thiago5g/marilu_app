const express = require("express");
// const validate = require("express-validation");
// const paramValidation = require("../config/user.validation");
var Budget = require("../controllers/budget.controller.js");
const router = express.Router(); // eslint-disable-line new-cap
// const permissions = require("../middlewares/permissions.js");

router.route("/")
	
	.get(Budget.findPaginate)
	
	.put( Budget.update)

router.route("/register")

	.post( Budget.register);

router.route("/approve")
	
	.put(Budget.approve);

router.route("/reserve")
	
	.put(Budget.reserve);

router.route("/:id")

	.delete( Budget.delete);

router.route("/print")

	.post(Budget.print);

module.exports = router;