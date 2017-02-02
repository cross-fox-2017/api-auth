var express = require('express')
var router = express.Router()
var userctrl = require('../controllers/userController')

router.get('/', userctrl.verify, userctrl.getAllUser)
router.get('/:id', userctrl.verify, userctrl.getSingleUser)
router.delete('/:id', userctrl.verify, userctrl.deleteUser)

router.put('/:id', userctrl.verify, userctrl.updateUser)
router.post('/signup', userctrl.signupUser)
router.post('/signin', userctrl.signinUser)
router.post('/setrole', userctrl.verify, userctrl.setRole)

module.exports = router
