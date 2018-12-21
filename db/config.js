const Sequelize = require('sequelize');

module.exports = {
    sequelize : new Sequelize('fipe-db', 'app_user', 'daitan@group', {
        dialect: 'postgres'
    }),
};