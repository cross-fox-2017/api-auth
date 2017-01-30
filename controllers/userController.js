const model = require('../models')
var passwordHash = require('password-hash');


module.exports = {

    getAllUser : function(req, res) {
        model.User.findAll().then(function(result){
              res.send(result);
        })
    },

    getSingleUser : function(req, res) {

      model.User.findById(req.params.id).then(function(result){
            res.send(result);
      })
    },

    create_user : function(req, res) {

    let username =  req.body.username
    let password =    req.body.password
    let email =   req.body.email
      model.User.create({

          username: username,
          password: password,
          email: email
      }).then(function(result){
          if(result){
                res.send('created')
            }
            else {
              res.send('Something Wrong !')
            }
      })

    },

    delete_user : function(req, res) {

      model.User.destroy({
          where : {
              id : req.params.id
          }
          }).then(function(user){

            res.send({message: `User with id: ${req.params.id} is deleted`})
      })

    },

    signup_user : function(req, res) {

      model.User.create({

        username  : req.body.username,
        password  : passwordHash.generate(req.body.password),
        name      : req.body.name,
        email     : req.body.email,
        bio       : req.body.bio,
        createdAt : new Date(),
        updatedAt : new Date()

      }).then(function(user){

              res.send({message: `new user created ! `})
      })

    },

    signin_user : function(req, res) {

      model.User.create({

        username  : req.body.username,
        password  : passwordHash.generate(req.body.password),
        name      : req.body.name,
        email     : req.body.email,
        bio       : req.body.bio,
        createdAt : new Date(),
        updatedAt : new Date()

      }).then(function(user){

              res.send({message: `new user created ! `})
      })

    },

    update_user : function(req, res) {
      model.User.findById(req.params.id).then(function(user){
            user.update({
              email : req.body.email
            })
              res.send({message: `User with id: ${req.params.id}. are change the email ! `})
      })

    }
}
