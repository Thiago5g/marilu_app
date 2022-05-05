const Sequelize = require("sequelize");
const dbConfig = require("../config/database.mssql.js");

const connection = new Sequelize(dbConfig);

module.exports = {
	index: async (req, res) => {
		try {
			const sellerCompany = await connection.query(
				"SELECT " +
          "SA3010.A3_COD AS code, " +
          "SA3010.A3_NOME AS name, " +
          "SA3010.A3_NREDUZ AS fantasyName " +
          "FROM SA3010 " +
          "WHERE SA3010.D_E_L_E_T_ = '' " +
          "ORDER BY A3_NOME",
				{ type: connection.QueryTypes.SELECT }
			);
			const cleanSellerCompany = sellerCompany.map((row) => {
				row.code = row.code.trim();
				row.name = row.name.trim();
				return row;
			});
			return res.json({ sellerCompanyList: cleanSellerCompany });
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message });
		}
	},
};
