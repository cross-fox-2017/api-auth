var models = require('../models');
var hash = require('password-hash');
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];

module.exports = {

    findAll : function(req, res, next) {
      models.User.findAll({raw: true}).then(function(users){
        res.send(users);
      })
    },

    findById : function(req, res, next) {
      models.User.findById(req.params.id).then(function (data) {
        res.send(data)
      })
    },

    createUser : function(req, res, next) {
      models.User.create({username: req.body.username ,password: hash.generate(req.body.password), isadmin: req.body.role}).then(function (data) {
          res.send(data)
        })
    },

    deleteUser : function(req, res, next) {
      models.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(){
      res.send(`data has been deleted for id ${req.params.id}`)
    })
    },

    updateUser : function(req, res, next) {
      models.User.findById(req.params.id).then(function (data) {
        data.update({
          username: req.body.username,
          password: hash.generate(req.body.password),
          isadmin: req.body.role,
          updateAt: new Date()
        })
      }).then(function(data){
      res.send(`data has been updated for ${data.username}`)
    })
    },

    signUp : function(req, res, next) {
      models.User.create({
        username: req.body.username,
        password: passwordHash.generate(req.body.password),
      }).then(function(data){
        res.send(data)
      })
    },

    signIn : function(req, res, next) {
      models.User.findOne({
        where:{
          username: req.body.username
        }
      }).then(function(user){
        if(!user){
          res.send('user not found')
        }
        if(hash.verify(req.body.password, user.password) == true){
          var token = jwt.sign(user.dataValues, config.secret, { expiresIn: 60 * 60 });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        } else {
            res.send("wrong password")
        }

    })
}
}
