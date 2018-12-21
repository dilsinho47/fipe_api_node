const Sequelize = require('sequelize');
const config = require('./../db/config');

const FavoriteCar = config.sequelize.define('favorite_car', {
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    year_id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    model_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    brand_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

module.exports = FavoriteCar;