"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true
			},
			username: {type: Sequelize.STRING(),allowNull: false},
			password: {type: Sequelize.STRING(),allowNull: false},
		})
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable("users");
	}
};
