const express = require("express");
// const validate = require("express-validation");
// const paramValidation = require("../config/user.validation");
var Order = require("../controllers/order.controller.js");
const router = express.Router(); // eslint-disable-line new-cap
// const permissions = require("../middlewares/permissions.js");

router.route("/")

	.get(Order.findPaginate);

router.route("/:id")

	.delete( Order.delete);

module.exports = router;