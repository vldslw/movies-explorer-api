const Movie = require('../models/movie');
const {
  OK,
} = require('../constants/constants');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }).sort({ createdAt: -1 })
    .populate(['owner'])
    .then((data) => res.status(OK).send(data))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((data) => {
      Movie.findById(data._id)
        .populate(['owner'])
        .then((card) => res.status(OK).send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при добавлении фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate(['owner'])
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным id не найден');
    })
    .then((card) => {
      if (card.owner.id === req.user._id) {
        card.remove()
          .then(() => res.status(OK).send(card))
          .catch(next);
      } else {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный id фильма'));
      } else {
        next(err);
      }
    });
};
