const Sequelize = require("sequelize");
const database = require("../database/mySql");
 
const Budget = database.define("budget", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	client: {type: Sequelize.TEXT,allowNull: false},
	products: {type: Sequelize.TEXT,allowNull: false},
	total: {type: Sequelize.STRING(), allowNull: false},
	validated: { type: Sequelize.STRING(), allowNull: false },
	status: { type: Sequelize.STRING(), allowNull: false },
	delivery: { type: Sequelize.STRING(150), allowNull: false },
	payment: { type: Sequelize.STRING(150), allowNull: false },
	shippingCompany: { type: Sequelize.STRING(150), allowNull: false },
	sellerCompany: { type: Sequelize.TEXT, allowNull: false },
	pesoliq: { type: Sequelize.STRING(150), allowNull: false },
	pesobru: { type: Sequelize.STRING(150), allowNull: false },
	volume: { type: Sequelize.STRING(150), allowNull: false },
	valfre: { type: Sequelize.STRING(150), allowNull: false },
	ordcomp: { type: Sequelize.STRING(150), allowNull: false },
	endent: { type: Sequelize.STRING(150), allowNull: false },
	codemp: { type: Sequelize.STRING(150), allowNull: false },
	operatorEmail: { type: Sequelize.STRING(150), allowNull: false },
}, {
	timestamps: false
})

// console.log(Budget, 'Budget')
 
module.exports = Budget;