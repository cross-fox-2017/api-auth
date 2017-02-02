var express = require('express')
var router = express.Router()
let userController = require('../../controllers/users_controller')

router.get('/', userController.verifyRole, userController.getUsers)

router.get('/:id', userController.getUser)

router.post('/', userController.verifyRole, userController.createUser)

router.delete('/:id', userController.verifyRole, userController.deleteUser)

router.put('/:id', userController.updateUser)

router.post('/signin', userController.signIn)

router.post('/signup', userController.signUp)

module.exports = router
