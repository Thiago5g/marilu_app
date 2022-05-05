const Sequelize = require("sequelize");
const dbConfig = require("../config/database.mssql.js");

const Clients = require("../models/clients.model");
const PaymentsType = require("../models/paymentsType.model");

const connection = new Sequelize(dbConfig);

const testConnection = async () => {
	try {
		await connection.authenticate();
		console.log("MS SQL Server beCare connected");
	} catch (error) {
		console.error("Unable to connect to the database", JSON.stringify(error));
	}
};

testConnection();

Clients.init(connection);
PaymentsType.init(connection);

module.exports = connection;
