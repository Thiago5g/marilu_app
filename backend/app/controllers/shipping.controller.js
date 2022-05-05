const Sequelize = require("sequelize");
const dbConfig = require("../config/database.mssql.js");

const connection = new Sequelize(dbConfig);

module.exports = {
	index: async (req, res) => {
		try {
			const shippingCompany = await connection.query(
				"SELECT " +
          "SA4010.A4_COD AS code, " +
          "SA4010.A4_NOME AS name, " +
          "SA4010.A4_NREDUZ AS fantasyName " +
          "FROM SA4010 " +
          "WHERE SA4010.D_E_L_E_T_ = '' " +
          "ORDER BY A4_NOME",
				{ type: connection.QueryTypes.SELECT }
			);
			const cleanShippingCompany = shippingCompany.map((row) => {
				row.code = row.code.trim();
				row.name = row.name.trim();
				return row;
			});
			return res.json({ shippingCompanyList: cleanShippingCompany });
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message });
		}
	},
};
