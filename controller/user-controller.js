let model      = require ('../models')
let user       = model.User;
const hash     = require('password-hash');
// const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

module.exports = {

    // Get all users
    getAllUser : function(req, res) {
      if (true) {

      }
      user.findAll().then(function (data) {
        res.send(data)
      })
    },

    // GET single user
    getUser : function(req, res) {
      user.findById(req.params.id).then(function (data) {
        res.send(data)
      })
    },

    // CREATE user
    createUser : function(req,res,next){
      user.create({username: req.body.username, password: hash.generate(req.body.password), role: req.body.role, createdAt: new Date(), updatedAt: new Date()})
      .then(function(data){
        res.send(data)
      })
    },

    //UPDATE
    updateUser : function(req,res){
      user.findById(req.params.id).then(function (data){
        data.update({username: req.body.username, password: hash.generate(req.body.password), role: req.body.role, updatedAt: new Date()})
        res.send(data)
        })
    },

    //DELETE
    deleteUser : function(req,res){
        user.findById(req.params.id)
        .then(function(data){
            data.destroy()
            .then(function(){
                res.send('data has been deleted')
            })
          })
    },

    //SIGN UP
    signUp : function(req,res,next){
      user.create({username: req.body.username, password: hash.generate(req.body.password), role: req.body.role, createdAt: new Date(), updatedAt: new Date()})
      .then(function(data){
        res.send(data)
      })
    },

    //SIGN IN
    signIn : function(req,res,next) {
      user.findOne({ where: {username: req.body.username} }).then(function(login) {
        if (!login) {
          res.send('user not found!')
        }
        if(hash.verify(req.body.password,login.password)){
          var token = jwt.sign({ username: login.username, role: login.role }, 'May the force be with you', {expiresIn : 60*60});
          res.json({token: token})
        }
        else{
          res.send('invalid username or password')
        }
    })
  },

    verifyAdmin : function (req, res, next) {
      var decode = jwt.verify(req.header('token'), 'May the force be with you')
      if (decode && decode.role) {
        next()
      }
      else if (decode && decode.role == false) {
        res.send('BUKAN ADMIN WOY!')
      }
      else {
        res.send('WRONG')
      }
    },

    verifyUser : function (req, res, next) {
      var decode = jwt.verify(req.header('token'), 'May the force be with you')
      if (decode && decode.role) {
        next()
      }
      else if (decode && decode.role == false) {
        next()
      }
      else {
        res.send('WRONG PASS')
      }
    }

}
