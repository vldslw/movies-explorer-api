const router = require('express').Router();
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validators');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = router;
