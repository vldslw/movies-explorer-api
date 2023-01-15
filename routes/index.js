const router = require('express').Router();
const { signupValidator, signinValidator } = require('../middlewares/validators');
const movieRouters = require('./movie');
const userRouters = require('./user');
const {
  addUser, login,
} = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', signupValidator, addUser);
router.post('/signin', signinValidator, login);

router.use(auth);
router.use('/users', userRouters);
router.use('/movies', movieRouters);

router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;
