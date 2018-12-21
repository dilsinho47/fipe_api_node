const express = require('express');
const router = express.Router();
const FavoriteCar = require('../model/FavoriteCar');
const Sequelize = require('sequelize');

// POST with body as {username, brand_id, model_id, year_id} to create a new favorite car for user
router.post('/favorites', async (req, res, next) => {
  let favoriteCar;
  try {
    favoriteCar = await FavoriteCar.create({
      username: req.body.username,
      brand_id: req.body.brand_id,
      model_id: req.body.model_id,
      year_id: req.body.year_id,
    });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      return next({ statusCode : 409, message : `This favorite car was already created` });
    } else if (error instanceof Sequelize.DatabaseError) {
      return next({ statusCode : 400, message : `Constraint error when creating favorite car: ${error.message}` });
    } else {
      return next({ error });
    }
  }

  res.send(favoriteCar);
});

// GET a JSON array with all favorite cars for user
router.get('/favorites/:username', async (req, res, next) => {
  let favorites;
  try {
    favorites = await FavoriteCar.findAll({ where: { username: req.params.username } });
  } catch (error) {
    next({ error });
  }

  if (favorites.length == 0) {
    return next({ statusCode : 404, message : `No favorites for user '${req.params.username}'` });
  }

  res.send(favorites);
});

module.exports = router;