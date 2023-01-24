const router = require('express').Router();
const { updateUserValidator } = require('../middlewares/validators');
const {
  getUser, updateUser,
} = require('../controllers/user');

router.get('/me', getUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
