const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Ecoregion extends Model {};

Ecoregion.init(
    {
        id: {
            type: DataTypes.STRING(6),
            allowNull: false,
            primaryKey: true
        },
        ecoregion_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        realm_id: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        biome_id: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'ecoregions'
    }
);

module.exports = Ecoregion;