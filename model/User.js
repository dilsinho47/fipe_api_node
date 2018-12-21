const Sequelize = require('sequelize');
const config = require('./../db/config');

const User = config.sequelize.define('user_account', {
    username: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    hash: {
      type: Sequelize.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

module.exports = User;