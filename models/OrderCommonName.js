const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class OrderCommonName extends Model {};

OrderCommonName.init(
    {
        id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        order_common_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_id: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'order_common_names'
    }
);

module.exports = OrderCommonName;