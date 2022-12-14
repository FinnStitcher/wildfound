const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Family extends Model {};

Family.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        family_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'families'
    }
);

module.exports = Family;