var express = require('express');
var router = express.Router();
var userctrl = require('../controllers/userController')

/* GET home page. */
router.get('/users',  userctrl.getAllUser);

router.get('/users/:id', userctrl.getSingleUser);

router.post('/users', userctrl.create_user);

router.delete('/users/:id', userctrl.delete_user );

router.put('/users/:id', userctrl.update_user);

router.post('/users/signup', userctrl.signup_user);
router.post('/users/:id', userctrl.update_user);

module.exports = router;
