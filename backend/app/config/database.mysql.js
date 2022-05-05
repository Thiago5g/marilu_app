module.exports = {
	dialect: "mysql",
	host: 'localhost',
	database: 'becare',
	username: 'root',
	password: '123456',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
