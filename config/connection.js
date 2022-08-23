const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'wildfound',
    'root',
    'absentwallprogramrequest',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = sequelize;