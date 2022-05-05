const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        super.init({                      
              code: { 
                  type: DataTypes.INTEGER, 
                  field: 'B1_COD', 
                  primaryKey: true, 
                  allowNull: false,
                },
              type: { type: DataTypes.STRING, field: 'B1_TIPO' },
              description: { type: DataTypes.STRING, field: 'B1_DESC' },
              quantity: { type: DataTypes.INTEGER, field: 'B1_PICMRET'},
              unity: { type: DataTypes.STRING, field: 'B1_UM' },       
              }, {
                sequelize, 
                modelName: 'SB1010',
                freezeTableName: true,
                timestamps: false
        })
    }

}

module.exports = Product

