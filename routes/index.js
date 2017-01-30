var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* User Signup. */
router.post('/signup', usersController.signupUser);

/* User Signin. */
router.post('/signin', usersController.signinUser);

module.exports = router;
