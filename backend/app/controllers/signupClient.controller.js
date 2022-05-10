const SignupClient = require("../models/signupClient.model.js");

exports.register = async (req, res) => {
	try{
		const newClient = SignupClient.create(req.body);
		
		if (!newClient) {
			return res.status(400).send({
				message: "Error for signup a client"
			});
		} else {
			return res.json(newClient);
		}
	}catch(err){
		res.status(500).send({
			message: err.message
		});
	}
}
