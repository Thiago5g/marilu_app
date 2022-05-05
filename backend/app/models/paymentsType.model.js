const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        super.init({                      
              code: { type: DataTypes.STRING, field: 'E4_CODIGO', primaryKey: true },
              description: { type: DataTypes.STRING, field: 'E4_DESCRI' },      
              }, {
                sequelize, 
                modelName: 'SE4010',
                freezeTableName: true,
                timestamps: false,
                
        })
    }
}

module.exports = Product

