const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')
const authController = require('../controller/authentication')


router.post('/api/users/signup',authController.signUp);
router.post('/api/users/signin',authController.signIn);
router.get('/api/users',authController.verifyToken,controller.displayAll);
router.get('/api/users/:id',authController.verifyToken,controller.displayOne);
router.post('/api/users',authController.verifyToken,controller.create);
router.delete('/api/users/:id',authController.verifyToken,controller.delete);
router.put('/api/users/:id',authController.verifyToken,controller.updateUser);

module.exports = router;
