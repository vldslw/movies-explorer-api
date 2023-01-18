const jwt = require('jsonwebtoken');
const {
  NODE_ENV,
  JWT_SECRET,
} = require('../config');
const AuthError = require('../errors/auth-err');
const { authNeededMsg } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(authNeededMsg));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError(authNeededMsg));
    return;
  }

  req.user = payload;
  next();
};
