const PaymentType = require("../models/paymentsType.model");

module.exports = {
	index: async (req, res) => {
		try {
			const paymentsType = await PaymentType.findAll({ 
				attributes: ["code", "description"],
				order: [["code", "asc"]] });
			return res.json({paymentTypeList: paymentsType})
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message})
		}
	}
}

 