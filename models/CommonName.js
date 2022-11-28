const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class CommonName extends Model {};

CommonName.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        common_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        species_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'common_names'
    }
);

module.exports = CommonName;