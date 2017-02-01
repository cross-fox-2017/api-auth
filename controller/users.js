const models = require('../models');
var user = models.User;
const hash = require('password-hash');
var express = require('express');
var app = express();
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllUsers : function(req, res) {
      user.findAll().then(function(data){
        res.send({users: data})
      })
  }, getSingleUser : function(req,res){
      user.findById(req.params.id).then(function(data){
        res.send({users: data})
      })
  }, createUser : function(req, res) {
      user.create({username: req.body.username, password: hash.generate(req.body.password), isadmin: req.body.isadmin, createdAt: new Date(), updatedAt: new Date()}).then(function(data){
        res.send({users: data})
      })
  }, deleteUser : function(req,res){
      user.findById(req.params.id).then(function(data){
        data.destroy()
        res.send(`Users with id:${req.params.id} has been deleted`)
      })
  }, updateUser : function(req,res){
      user.findById(req.params.id).then(function(data){
        data.update({username:req.body.username,password:hash.generate(req.body.password),isadmin:req.body.isadmin, updatedAt: new Date()})
        res.send({users: data})
      })
  }, signup : function (req,res) {
      user.create({username: req.body.username, password: hash.generate(req.body.password), isadmin:false, createdAt: new Date(), updatedAt: new Date()}).then(function(data){
        res.send({users: data})
      })
  }, signin : function (req, res) {
      user.findOne({
        where: {
          username: req.body.username
        }
      }).then(function(data) {
        console.log(data);
        if(data == null) {
          res.send('NO USER DETECTED')
        }
        var verify = hash.verify(req.body.password, data.password)
        if(verify == true) {
        var token = jwt.sign({id:data.id, username:data.username, isadmin: data.isadmin}, config.secret)
          res.send({users: data, token: token})
        } else {
          res.send('WRONG PASSWORD')
        }
      })
    }, verifyAdmin : function (req,res,next) {
      var decode = jwt.verify(req.header('token'), config.secret)
      if (decode && decode.isadmin) {
        next()
      } else if (decode && decode.isadmin == false) {
        res.send('YOU ARE NOT ADMIN')
      } else {
        res.send('WRONG KEY')
      }
    }, verifyUser: function (req,res,next) {
      var decode = jwt.verify(req.header('token'), config.secret)
      if (decode && decode.isadmin) {
        next()
      } else if (decode && decode.isadmin == false) {
        next()
      } else {
        res.send('WRONG KEY')
      }
    }
}
