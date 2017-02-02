var express = require('express');
var router = express.Router();
const users = require('../controller/user')

/* GET users listing. */
router.post('/signup',users.signup);
router.post('/signin',users.signin);
router.get('/:token', users.getAllData);
router.post('/:token', users.getById);
router.post('/create/:token', users.createUser);
router.put('/:token', users.updateData);
router.delete('/:token', users.delete);








module.exports = router;
