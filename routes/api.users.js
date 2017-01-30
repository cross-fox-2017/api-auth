var express = require('express');
var router = express.Router();
var users = require('../controllers/controller.user');



/* GET users listing. */
router.get('/', users.getAllUser);

router.get('/:id', users.getOneUser);

router.post('/', users.createOneUser);

router.delete('/:id', users.deleteOneUser);

router.put('/:id', users.editOneUser);

module.exports = router;
