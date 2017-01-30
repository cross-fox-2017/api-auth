'use strict'
const router = require('express').Router();
const userController = require('../controller/userController.js')

router.get('/users', userController.listUser)

router.get('/users/:id', userController.getUser)

router.post('/users', userController.createUser)

router.delete('/users/:id', userController.deleteUser)

router.put('/users/:id', userController.updateUser)

module.exports = router
