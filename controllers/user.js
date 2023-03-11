const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  NODE_ENV,
  JWT_SECRET,
} = require('../config');
const User = require('../models/user');
const {
  OK,
  incorrectDataMsg,
  userIdNotFoundMsg,
  existingEmailMsg,
} = require('../constants/constants');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.addUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((data) => {
      res.status(OK).send({
        email: data.email,
        name: data.name,
        _id: data._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(incorrectDataMsg));
      } else if (err.code === 11000) {
        next(new ConflictError(existingEmailMsg));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(userIdNotFoundMsg);
    })
    .then((user) => res.status(OK).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError(userIdNotFoundMsg);
    })
    .then((data) => res.status(OK).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(incorrectDataMsg));
      } else if (err.code === 11000) {
        next(new ConflictError(existingEmailMsg));
      } else {
        next(err);
      }
    });
};
