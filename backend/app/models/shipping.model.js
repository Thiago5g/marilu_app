const { Model, DataTypes } = require('sequelize');

class Shipping extends Model {
    static init(sequelize) {
        super.init({                      
              code: { type: DataTypes.INTEGER, field: 'A4_COD', primaryKey: true },
              name: { type: DataTypes.STRING, field: 'A4_NOME' },      
              }, {
                sequelize, 
                modelName: 'SA4010',
                freezeTableName: true,
                timestamps: false,
                
        })
    }
}

module.exports = Shipping

