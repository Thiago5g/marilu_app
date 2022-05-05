const { Model, DataTypes } = require("sequelize");

class Seller extends Model {
  static init(sequelize) {
    super.init(
      {
        cod: { type: DataTypes.INTEGER, field: "A3_COD", primaryKey: true },
        nome: { type: DataTypes.STRING, field: "A3_NOME" },
        alias: { type: DataTypes.STRING, field: "A3_NREDUZ" },
      },
      {
        sequelize,
        modelName: "SA3010",
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
}

module.exports = Seller;
