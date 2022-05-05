const { Model, DataTypes } = require("sequelize");

class Client extends Model {
	static init(sequelize) {
		super.init(
			{
				cod: { type: DataTypes.INTEGER, field: "A1_COD", primaryKey: true },
				loja: { type: DataTypes.STRING, field: "A1_LOJA" },
				cliente: { type: DataTypes.STRING, field: "A1_NOME" },
				cgc: { type: DataTypes.STRING, field: "A1_PESSOA" },
				nomeFantasia: { type: DataTypes.STRING, field: "A1_NREDUZ" },
				endereco: { type: DataTypes.STRING, field: "A1_END" },
				bairro: { type: DataTypes.STRING, field: "A1_BAIRRO" },
				email: { type: DataTypes.STRING, field: "A1_EMAIL" },
				estado: { type: DataTypes.STRING, field: "A1_EST" },
				cep: { type: DataTypes.STRING, field: "A1_CEP" },
				cidade: { type: DataTypes.STRING, field: "A1_MUN" },
				ddd: { type: DataTypes.INTEGER, field: "A1_DDD" },
				telefone: { type: DataTypes.STRING, field: "A1_TEL" },
				cnpjoucpf: { type: DataTypes.STRING, field: "A1_CGC" },
				inscr: { type: DataTypes.STRING, field: "A1_INSCR" },
				vend: { type: DataTypes.STRING, field: "A1_VEND" },
				contrib: { type: DataTypes.INTEGER, field: "A1_CONTRIB" },
				limitecredito: { type: DataTypes.INTEGER, field: "A1_LC" },
				titulosprotestados: { type: DataTypes.INTEGER, field: "A1_TITPROT" },
				saldoaberto: { type: DataTypes.INTEGER, field: "A1_SALDUP" },
				mediaatraso: { type: DataTypes.INTEGER, field: "A1_METR" },
				titulosvencidos: { type: DataTypes.INTEGER, field: "A1_ATR" },
				maiorcompra: { type: DataTypes.INTEGER, field: "A1_MCOMPRA" },
				pricom: { type: DataTypes.STRING, field: "A1_PRICOM" },
				ultcom: { type: DataTypes.INTEGER, field: "A1_ULTCOM" },
				tabelaproduto: { type: DataTypes.INTEGER, field: "A1_TABELA" },
			},
			{
				sequelize,
				modelName: "SA1010",
				freezeTableName: true,
				timestamps: false,
			}
		);
	}
}

module.exports = Client;
