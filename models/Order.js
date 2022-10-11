const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {};

Order.init(
    {
        id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        order_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'orders'
    }
);

module.exports = Order;