const User = require('../model/User');

async function authenticate(req, res, next) {
  if (req.url == '/login' || req.url == '/signup') {
    next();
    return;
  }

  let username = req.get('X-USERNAME');
  let hash = req.get('X-HASH');
  if (!username || !hash) {
    return next({ statusCode: 401, message: `No X-USERNAME or X-HASH headers were found, please sign up and login` });
  }

  let user;
  try {
    user = await User.findOne({
      where: {
        username: username,
        hash: hash,
      }
    });
  } catch (error) {
    return next({ error });
  }
  if (!user) {
    return next({ statusCode: 403, message: 'Wrong credentials' });
  }

  // user is allowed, so let request go
  return next();
}

module.exports = authenticate;