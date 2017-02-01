var express = require('express');
var router = express.Router();
var con = require('../controller/usersController.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('nothing here');
});

router.get('/api/users',con.verifyAdmin,con.findAllUsers)

router.get('/api/users/:id',con.verify, con.findUser)

router.post('/api/signup',con.createUser)

router.put('/api/users/:id',con.verify,con.updateUser)

router.delete('/api/users/:id',con.verifyAdmin,con.deleteUser)

router.post('/api/signin',con.isLogin)

module.exports = router;
