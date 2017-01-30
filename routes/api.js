var express = require('express');
var router = express.Router();
var controller = require('../controller/controllerUsers.js')
var jwt = require('jsonwebtoken');
/* GET home page. */

router.get('/', function(){
  res.send('Hello! The API is at http://localhost:3000/api/users')
})

router.get('/users', controller.findAll);

router.get('/users/:id', controller.findById);

router.post('/users', controller.createUser);

router.post('/signup', controller.signUp);

router.post('/signin', controller.signIn);

router.delete('/users/:id', controller.deleteUser);

router.put('/users/:id', controller.updateUser);

module.exports = router;
