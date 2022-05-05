module.exports = {
	dialect: "mssql",
	host: "localhost",
	database: "TMPRD-BECARE",
	username: "admin",
	password: "1020304050",
	dialectOptions: {
		options: {
			validateBulkLoadParameters: true,
		},
	},
	define: {
		timestamps: false,
		underscored: false,
	},
	logging: false,
};
