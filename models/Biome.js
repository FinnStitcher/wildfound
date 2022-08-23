const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Biome extends Model {};

Biome.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        biome_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'biomes'
    }
);

module.exports = Biome;