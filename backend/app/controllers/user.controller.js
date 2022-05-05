const User = require("../models/user.model.js");
// const Role = require("../models/role.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config.js");

exports.register = async (req, res) => {
	try{
		req.body.password = bcrypt.hashSync(req.body.password, 10);
		var newUser = await User.create(req.body);
		if (!newUser) {
			return res.status(400).send({
				message: "Cannot create this user"
			});
		} else {
			newUser.password = undefined;
			return res.json(newUser);
		}
	}catch(err){
		res.status(500).send({
			message: err.message,
		});
	}
	
}

// exports.findPaginate = (req, res) => {
    
// 	User.paginate({}, { page: req.query.page, limit: req.query.limit })
// 		.then(users => {
// 			let jsonResponse = {
// 				"resp" : users
// 			};
// 			res.status(200).send(jsonResponse);
// 		}).catch(err => {
// 			res.status(500).send({
// 				message: err.message
// 			});
// 		});    
// };


exports.update = async (req, res) => {

	if(req.body.password != undefined && req.body.password != null)
	{
		req.body.password = bcrypt.hashSync(req.body.password, 10);
	}
	User.update(req.body, {where: {id: req.params.id}})
		.then(user => {
			if(!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});
			}
			res.send(user);
		}).catch(err => {
			if(err.kind === "ObjectId") {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});                
			}
			return res.status(500).send({
				message: "Error updating user with id " + req.params.id
			});
		});
}

exports.delete = function(req, res){

	User.destroy({where: req.params.id})
		.then(user => {
			if(!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});
			}
			res.send({message: "User deleted successfully!"});
		}).catch(err => {
			if(err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "User not found with id " + req.params.id
				});                
			}
			return res.status(500).send({
				message: "Could not delete user with id " + req.params.id
			});
		});
}

exports.sign_in = async (req, res) => {
	try{
		const user = await User.findOne({ where:
			{ username: req.body.username }
		})
		if (!user || !user.comparePassword(req.body.password)) {
			return res.status(401).json({ message: "Authentication failed. Invalid user or password." });
		}
		return res.json({ 
			token: `Bearer ${jwt.sign({ username: user.username, password: user.password, roles: user.roles}, config.jwt_secret, {expiresIn: "7200s"})}`,
			email: user.username,
			permissions: user.fk_role === 1 ? ['SELLER'] : ['ADMIN'] ,
		});
	}catch(err){
		if (err) throw err;
		return res.status(500).json({ message: err.message });
	}	
}

exports.loginRequired = function(req, res, next) {
	if (req.user) {
		next();
	} else {
		return res.status(401).json({ message: "Unauthorized user!" });
	}
};