var jwt = require("jsonwebtoken");
var config = require("../config/config.js");

module.exports = function(req, res, next) {
	if( req.headers && req.headers["authorization"] ) {
		try {
			const token = req.headers["authorization"].split(" ")[1]
			req.user = jwt.verify(token, config.jwt_secret);
		} catch(err) {
			return res.status(401).json({
				error: {
					msg: "Failed to authenticate token!"
				}
			});
		}
	} else {
		return res.status(401).json({
			error: {
				msg: "No token!"
			}
		});
	}
	next();
	return;

}