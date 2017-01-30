var express = require('express');
var router = express.Router();
var users = require('../controllers/controller.user');
var middleware = require('../controllers/middleware');



/* GET users listing. */
router.get('/', users.getAllUser);

router.get('/:id', users.getOneUser);

router.post('/', users.createOneUser);

router.delete('/:id', users.deleteOneUser);

router.put('/:id', users.editOneUser);

/* Login */
router.post('/login', middleware.login, users.login);

module.exports = router;
