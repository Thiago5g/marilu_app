const Sequelize = require("sequelize");
const database = require("../database/mySql");
const bcrypt = require("bcrypt");
 
const User = database.define("user", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {type: Sequelize.STRING(), allowNull: false},
	password: {type: Sequelize.STRING(), allowNull: false},
	fk_role: {type: Sequelize.INTEGER, allowNull: false},
}, {
	timestamps: false,
})

User.prototype.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}
 
module.exports = User;



