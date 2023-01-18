const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth-err');
const {
  incorrectLoginMsg,
  incorrectEmailMsg,
} = require('../constants/constants');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: incorrectEmailMsg,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(incorrectLoginMsg);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(incorrectLoginMsg);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
