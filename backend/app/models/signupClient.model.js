const Sequelize = require("sequelize");
const database = require("../database/sqlServer");
 
const SignupClient = database.define("signupClient", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	razasocial: {type: Sequelize.STRING(), allowNull: false},
	nomefantasia: {type: Sequelize.STRING(), allowNull: false},
	cpfoucnpj: {type: Sequelize.STRING(), allowNull: false},
	inscricao: {type: Sequelize.STRING(), allowNull: false},
	cep: {type: Sequelize.STRING(), allowNull: false},
	endereco: {type: Sequelize.STRING(), allowNull: false},
	numero: {type: Sequelize.STRING(), allowNull: false},
	bairro: {type: Sequelize.STRING(), allowNull: false},
	cidade: {type: Sequelize.STRING(), allowNull: false},
	estado: {type: Sequelize.STRING(), allowNull: false},
	telefone: {type: Sequelize.STRING(), allowNull: false},
	email: {type: Sequelize.STRING(), allowNull: false},
	representante: {type: Sequelize.STRING(), allowNull: false},
}, {
	timestamps: false,
})

// SignupClient.prototype.comparePassword = function(password) {
// 	return bcrypt.compareSync(password, this.password);
// }
 
module.exports = SignupClient;



