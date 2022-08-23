const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Realm extends Model {};

Model.init(
    {
        id: {
            type: DataTypes.STRING(2),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        realm_name: {
            type: DataTypes.STRING(15),
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'realm'
    }
);

module.exports = Realm;