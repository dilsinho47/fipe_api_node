var express = require('express');
var router = express.Router();

var CarService = require('../services/car_service');

// GET car price as {price} in /cars/<brandId>/<modelId>/<yearId>
router.get('/cars', CarService.getBrands);
router.get('/cars/:brandId', CarService.getModels);
router.get('/cars/:brandId/:modelId', CarService.getYears);
router.get('/cars/:brandId/:modelId/:yearId', CarService.getPrice);

module.exports = router;
