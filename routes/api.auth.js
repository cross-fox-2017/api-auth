var express = require('express')
var router = express.Router()
var users = require('../controllers/controller.user')
var middleware = require('../controllers/middleware')

/* localhost:3000/api/auth/register | for create new user but not admin user */
router.post('/register', users.createOneUser)
/* localhost:3000/api/auth/login | admin login */
router.post('/login', users.login)
/* localhost:3000/api/auth/profile | admin login */
router.get('/profile', middleware.decodeToken, middleware.validateUser, users.getAdminProfile)

module.exports = router
