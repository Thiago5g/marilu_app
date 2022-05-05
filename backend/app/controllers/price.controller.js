const Sequelize = require("sequelize");
const dbConfig = require("../config/database.mssql.js");

const connection = new Sequelize(dbConfig);

module.exports = {
	index: async (req, res) => {
		try {
			const { productCod, productDescription, productTable } = req.body;
			console.log(productCod, 'produtosCod')
			let query =
        "SELECT " +
        "DA1.DA1_CODTAB AS codTable, " +
        "DA1.DA1_CODPRO AS codproduct, " +
        "SB1.B1_DESC AS description, " +
        "SB1.B1_UM AS unity, " +
        "DA1.DA1_PRCVEN AS price, " +
		"DA1.DA1_VCOMI2 AS price2, " +
		"DA1.DA1_VCOMI3 AS price3, " +
		"DA1.DA1_VCOMI4 AS price4, " +	
		"DA1.DA1_PRCVEN AS price5, " +		
        "DA1.DA1_MARSEG AS security, " +
        "DA1.DA1_PERCOM AS commission " +
        "FROM DA1010 DA1 INNER JOIN SB1010 SB1 ON DA1.DA1_CODPRO = SB1.B1_COD " +
        "WHERE SB1.D_E_L_E_T_ = '' AND DA1.D_E_L_E_T_ = ''";

			if (productCod && productCod !== "")
				query += ` AND DA1.DA1_CODPRO = '${productCod}'`;
			if (productDescription && productDescription !== "")
				query += ` AND SB1.B1_DESC LIKE '%${productDescription}%'`;
			if (productTable && productTable !== "000")
				query += ` AND DA1.DA1_CODTAB = '${productTable}'`;

			const price1 = await connection.query(query, {
				type: connection.QueryTypes.SELECT,
			});

			const cleanPrice1 = price1.map((row) => {
				row.description = row.description.trim();
				row.codproduct = row.codproduct.trim();
				row.unity = row.unity.trim();
				return row;
			});

			return res.json({ priceList: cleanPrice1 });
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message });
		}
	},

	update: async (req, res) => {
		try {
			const { price, security, commission, codTable, codproduct } = req.body;

			const dataUpdate = await connection.query(
				"UPDATE DA1010 " +
          `SET DA1_PRCVEN = ${price}, ` +
          `DA1_MARSEG = ${security}, ` +
          `DA1_PERCOM = ${commission} ` +
          `WHERE DA1_CODTAB = '${codTable}' AND DA1_CODPRO = '${codproduct}'`,
				{ type: connection.QueryTypes.UPDATE }
			);
			if (dataUpdate) return res.json({ update: "success" });
		} catch (error) {
			return res.status(500).json({ error: true, message: error.message });
		}
	},
};
