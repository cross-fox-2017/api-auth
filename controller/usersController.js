'use strict'
const db = require('../models');
const user = db.User
var jwt = require('jsonwebtoken')

module.exports={

  createUser: function(req,res){
    db.User.create({user_name:req.body.username,password:req.body.password,role:req.body.role}).then(function(user){
      res.send(user)
    })
  },

  isLogin: function(req,res){
    db.User.findOne({where:{user_name:req.body.username}}).then(function(user){
      if(!user){
        res.json({ success: false, message: 'Authentication failed. no such username.' });
      }
      else if(user.password !== req.body.password){
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      }
      else{
        var token = jwt.sign({username:user.user_name,role:user.role}, 'superSecret',{expiresIn: 60*60})
        var decoded = jwt.verify(token, 'superSecret');
        req.header= decoded
        res.json(
          {
            success: true,
            token: token,
            decode: req.header,

          }
        );

      }
    })
  },


  findAllUsers :function(req,res){
    db.User.findAll().then(function(users){
      res.json(users)
    })
  },

  findUser: function(req,res){
    db.User.find({where:{id:req.params.id}}).then(function(user){
      res.json(user)
    })
  },

  updateUser: function(req,res){
    db.User.findOne({where:{id:req.params.id}}).then(function(user){
      user.update({user_name:req.body.username,password:req.body.password}).then(function(user){
        res.send(user)
      })
    })
  },

  deleteUser: function(req,res){
    db.User.findOne({where:{id:req.params.id}}).then(function(user){
      user.destroy().then(function(){
        res.send(user)
      })
    })
  }



}
