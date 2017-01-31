var express = require('express');
var router = express.Router();
var db = require("../models");
var userController = require("../controllers/users")
// var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var config = require('../config/config');

router.get('/users', userController.list)

router.post('/users', userController.add)

router.get('/users/:id', userController.find)

router.put('/users/:id', userController.update)

router.delete('/users/:id',userController.delete)

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

module.exports = router;
