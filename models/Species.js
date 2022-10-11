const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Species extends Model {};

Species.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        species_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genus_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        class_id: {
            type: DataTypes.TINYINT,
            allowNull: true
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'species'
    }
);

module.exports = Species;
