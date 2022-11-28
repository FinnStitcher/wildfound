const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Genus extends Model {};

Genus.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        genus_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        family_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'genera'
    }
);

module.exports = Genus;