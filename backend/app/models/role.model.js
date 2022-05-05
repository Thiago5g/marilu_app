const Sequelize = require("sequelize");
const database = require("../database/mySql");
 
const Role = database.define("role", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	description: {type: Sequelize.STRING(),allowNull: false},
	permissions: {type: Sequelize.STRING(),allowNull: false},
}, {
	timestamps: false,
})
 
module.exports = Role;



