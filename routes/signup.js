var express = require('express');
var router = express.Router();
const User = require('../model/User');
const Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

// POST to create a new account with request body as {username, password}
router.post('/signup', async (req, res, next) => {
  var salt = await bcrypt.genSalt();
  var hash = await bcrypt.hash(req.body.password, salt);

  try {
    await User.create({
      username: req.body.username,
      hash: hash,
    });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      return next({ statusCode : 409, message : `The user '${req.body.username}' is already used` });
    } else if (error instanceof Sequelize.DatabaseError) {
      return next({ statusCode : 400, message : `Constraint error when creating user` });
    } else {
      return next({ statusCode : 500, message : `Database error` });
    }
  }

  res.send(hash);
});

module.exports = router;