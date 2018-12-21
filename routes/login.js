var express = require('express');
var router = express.Router();
const User = require('../model/User');
var bcrypt = require('bcryptjs');

// 
/**
 * POST in /login with request body as {username, password} to allow user to log into an existing account
// @return the user hash
 */
router.post('/login', async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ where: { username: req.body.username } });
  } catch (error) {
    next({ error });
  }

  if (user) {
    var isCorrect = await bcrypt.compare(req.body.password, user.hash);
    if (isCorrect) {
      res.send(user.hash);
    } else {
      return next({ statusCode: 401, message: `Wrong password` });
    }
  } else {
    return next({ statusCode: 404, message: `User ${req.body.username} was not found` });
  }
});

module.exports = router;

