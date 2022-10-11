const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class EcoregionSpecies extends Model {};

EcoregionSpecies.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ecoregion_id: {
            type: DataTypes.STRING(6),
            allowNull: false,
            references: {
                model: 'ecoregions',
                key: 'id'
            }
        },
        species_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'species',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'ecoregions_species'
    }
);

module.exports = EcoregionSpecies;