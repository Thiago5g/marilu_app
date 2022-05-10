const Sequelize = require("sequelize");
const database = require("../database/mySql");
const bcrypt = require("bcrypt");

const SignupUser = database.define("signupUser", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nome: { type: Sequelize.STRING(), allowNull: false },
	cpf: { type: Sequelize.STRING(), allowNull: false },
	email: { type: Sequelize.STRING(), allowNull: false },
	cep: { type: Sequelize.STRING(), allowNull: false },
	endereco: { type: Sequelize.STRING(), allowNull: false },
	numero: { type: Sequelize.STRING(), allowNull: false },
	bairro: { type: Sequelize.STRING(), allowNull: false },
	cidade: { type: Sequelize.STRING(), allowNull: false },
	estado: { type: Sequelize.STRING(), allowNull: false },
	telefone: { type: Sequelize.STRING(), allowNull: false },
	email: { type: Sequelize.STRING(), allowNull: false },
	password: { type: Sequelize.STRING(), allowNull: false },
	fk_role: { type: Sequelize.INTEGER(), allowNull: false }
}, {
	sequelize,
	modelName: 'users',
	freezeTableName: true,
	timestamps: false,
})

SignupUser.prototype.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = SignupUser;



