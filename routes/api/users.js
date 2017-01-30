var express = require('express');
var router = express.Router();
let userController = require ('../../controllers/users_controller');

router.get('/', userController.getUsers)

router.get('/:id', userController.getUser)

router.post('/', userController.createUser)

router.delete('/:id', userController.deleteUser)

router.put('/:id', userController.updateUser)

module.exports = router;
