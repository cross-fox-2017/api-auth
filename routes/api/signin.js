var express    = require('express');
var router     = express.Router();
var controller = require('../../controller/user-controller.js')

// SIGN IN
router.post('/', controller.signIn)

module.exports = router;
