var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* User Signin. */
router.post('/signin', usersController.userSignin);

module.exports = router;
