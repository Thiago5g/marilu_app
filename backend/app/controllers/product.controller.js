const Sequelize = require("sequelize");
const dbConfig = require("../config/database.mssql.js");

const connection = new Sequelize(dbConfig);

module.exports = {
	index: async (req, res) => {
		try {
			const { tableProduct } = req.params;
			const query = "SELECT " +
                "SB1010.B1_COD AS code, " +
                "SB1010.B1_DESC AS description, " +
                "SB1010.B1_UM AS unity, " +
                "SB1010.B1_IPI AS ipi, " +
				"SB1010.B1_CONV AS qtdEmb , " +
				"SB1010.B1_UPRC AS customedio, " +
                "SB1010.B1_CONV AS estoqueBruto," +
                "SB1010.B1_ESTSEG AS reserva, " +
                "DA1010.DA1_PRCVEN AS price, " +
				"DA1010.DA1_MARSEG AS security, " +
                "DA1010.DA1_PERCOM AS commission " +
                "FROM SB1010 INNER JOIN DA1010 ON DA1010.DA1_CODPRO = SB1010.B1_COD " +
                `WHERE DA1010.DA1_CODTAB = '${tableProduct}'  AND DA1010.D_E_L_E_T_ = '' `;


			const products = await connection.query(query, {
				type: connection.QueryTypes.SELECT,
			});

			const cleanProducts = products.map((row) => {
				row.description = row.description.trim();
				row.unity = row.unity.trim();
				row.quantity = 1;
				return row;
			});
			return res.json({ productList: cleanProducts });
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message });
		}
	},
};
