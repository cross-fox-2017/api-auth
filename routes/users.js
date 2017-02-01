var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');

/* GET all users listing. */
router.get('/', controller.verify, controller.getUsers);

/* GET a single user. */
router.get('/:id', controller.verify, controller.getUser);

/* Create a user. */
router.post('/', controller.verify, controller.createUser);

/* Delete a user. */
router.delete('/:id', controller.verify, controller.deleteUser);

/* Update a user. */
router.put('/:id', controller.verify, controller.updateUser);

router.post('/signin', controller.userSignin);


module.exports = router;
