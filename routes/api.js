'use strict'
const router = require('express').Router();
const userController = require('../controller/userController.js')
const middleware = require('../controller/middleware.js')

router.get('/users', middleware.adminCek, userController.listUser)

router.get('/users/:id', userController.getUser)

router.post('/users', middleware.adminCek, userController.createUser)

router.delete('/users/:id', middleware.adminCek, userController.deleteUser)

router.put('/users/:id', userController.updateUser)

router.post('/signin', userController.signin)

router.post('/signup', userController.signup)

router.get('/*', userController.stopper)

module.exports = router
