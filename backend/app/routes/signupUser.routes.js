const express = require("express");
const validate = require("express-validation");
const paramValidation = require("../config/user.validation");
var SignupUser = require("../controllers/signupUser.controller.js");
const router = express.Router(); // eslint-disabl

router.route("/sign-up")

	.post(validate(paramValidation.register), SignupUser.register);


	module.exports = router;