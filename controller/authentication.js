const models = require('../models')
const User = models.User
const hash = require('password-hash')
const jwt = require('jsonwebtoken')

module.exports = {
  signUp: function (req, res, next) {
    User.create({
      username:req.body.username,
      password:req.body.password,
      email:req.body.email
    }).catch(function (err) {
      res.send(err.message)
    }).then(res.send(`${req.body.username} has been created`))
  },
  signIn: function (req, res, next) {
  var token = jwt.sign({username: req.body.username}, process.env.SECRET, { expiresIn: 60 * 60 })
    User.findOne({
      where:{
        username: req.body.username,
        password: req.body.password
    }}).then(function(user){
      if(user){
        res.json(token)
      }else{
        res.json({
          msg:"data not found"
        })
      }
    })
  },
  verifyToken: function (req, res, next) {
    var decode = jwt.verify(req.header('token'), process.env.SECRET)
    if (decode) {
      next()
    } else {
      res.send('you are not login')
    }
  }

}
