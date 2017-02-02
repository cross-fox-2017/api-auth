var express = require('express');
var router = express.Router();
const users = require('../controller/user')

/* GET users listing. */
router.get('/', users.getAllData);
router.get('/:id', users.getById);
router.post('/', users.createUser);
router.delete('/:id', users.delete);
router.put('/:id', users.updateData);
router.post('/signup',users.signup);
router.post('/signin',users.signin);






module.exports = router;
