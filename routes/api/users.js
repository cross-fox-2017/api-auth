var express = require('express');
var router = express.Router();
const controller = require('../../controller/users.js');

router.get('/users', controller.verifyAdmin, controller.getAllUsers);

router.get('/users/:id',controller.verifyUser, controller.getSingleUser);

router.post('/users/',controller.verifyAdmin, controller.createUser);

router.delete('/users/:id',controller.verifyUser, controller.deleteUser);

router.put('/users/:id',controller.verifyUser, controller.updateUser);

router.post('/signin', controller.signin);

router.post('/signup', controller.signup);

module.exports = router;
