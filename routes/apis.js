var express = require('express');
var router = express.Router();
var db = require("../models");
var userController = require("../controllers/users")

router.get('/users', userController.cekdataAdmin, userController.list)

router.post('/users', userController.cekdataAdmin, userController.add)

router.get('/users/:id', userController.cekdataUser, userController.find)

router.put('/users/:id', userController.cekdataUser, userController.update)

router.delete('/users/:id',userController.cekdataUser, userController.delete)

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

module.exports = router;
