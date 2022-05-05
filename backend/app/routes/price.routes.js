const express = require("express")
const PriceController = require("../controllers/price.controller")
const router = express.Router();

router.route("/")
	
	.get(PriceController.index)
	
	.post(PriceController.index)
	
	.put(PriceController.update)

module.exports = router;