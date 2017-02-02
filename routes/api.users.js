var express = require('express')
var router = express.Router()
var users = require('../controllers/controller.user')
var middleware = require('../controllers/middleware')

/* localhost:3000/api/users | show all data user */
router.get('/', middleware.decodeToken, middleware.validateUser, users.getAllUser)
/* localhost:3000/api/users/:id | show one data user */
router.get('/:id', middleware.decodeToken, middleware.validateUser, users.getOneUser)
/* localhost:3000/api/users/:id | delete one data user */
router.delete('/:id', middleware.decodeToken, middleware.validateUser, users.deleteOneUser)
/* localhost:3000/api/users:id | edit one data user */
router.put('/:id', middleware.decodeToken, middleware.validateUser, users.editOneUser)

module.exports = router
