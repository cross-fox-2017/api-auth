var express = require('express');
var router = express.Router();
const controller = require('../../controller/users.js');

router.get('/users', controller.getAllUsers);

router.get('/users/:id', controller.getSingleUser);

router.post('/users/', controller.createUser);

router.delete('/users/:id', controller.deleteUser);

router.put('/users/:id', controller.updateUser);

router.post('/signin', controller.signin);

module.exports = router;
