var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* GET all users listing. */
router.get('/',usersController.getUsers);

/* GET a single user. */
router.get('/:id', usersController.getUser);

/* Create a user. */
router.post('/', usersController.createUser);

/* Delete a user. */
router.delete('/:id', usersController.deleteUser);

/* Update a user. */
router.put('/:id', usersController.updateUser);


module.exports = router;
