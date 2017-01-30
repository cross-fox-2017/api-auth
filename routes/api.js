var express = require('express');
var router = express.Router();
var controller = require('../controller/controllerUsers.js')
/* GET home page. */
router.get('/users', controller.findAll);

router.get('/users/:id', controller.findById);

router.post('/users', controller.createUser);

router.delete('/users/:id', controller.deleteUser);

router.put('/users/:id', controller.updateUser);

module.exports = router;
