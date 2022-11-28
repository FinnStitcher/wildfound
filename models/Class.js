const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Class extends Model {};

Class.init(
    {
        id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        class_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'classes'
    }
);

module.exports = Class;