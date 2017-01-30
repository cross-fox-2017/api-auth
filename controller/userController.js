'use strict'

const models = require('../models')
const hash = require('password-hash')
const jwt = require('jsonwebtoken');
var config = require('../config/secret.js')

var express = require('express');
var app = express();

let user = models.User

let userController = {
  signup: function (req, res){
    let username = req.body.username
    let email = req.body.email
    let password = hash.generate(req.body.password)
    user.create({username: username, email: email, password: password, role: 'user'}).then(function(data){
      res.json(data)
    })
  },
  signin: function (req, res) {
    let username = req.body.username
    let password = req.body.password
    user.find({where: {username : username}}).then(function(data){
      if(!data){
        res.send('user not found')
      }
      if(hash.verify(password, data.password)){
        var token = jwt.sign(data.dataValues, config.secret, { expiresIn: 60 * 60 });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      } else {
        res.send('Wrong username or password')
      }
    })
  },
  listUser: function(req, res){
    user.findAll().then(function(data){
      let result = []
      data.forEach(function(datas){
        result.push(datas.dataValues)
      })
      res.json(result)
    })
  },
  createUser: function(req, res){
    let username = req.body.username
    let email = req.body.email
    let password = hash.generate(req.body.password)
    let role = req.body.role
    user.create({username: username, email: email, password: password, role: role}).then(function(data){
      res.json({
        created: 'success',
        data: data
      })
    })
  },
  getUser: function (req, res) {
    let id = req.params.id
    user.findById(id).then(function(user){
      if(!user){
        res.send(`user id ${id} not found`)
      }
      res.json(user)
    })
  },
  deleteUser: function (req, res) {
    let id = req.params.id
    user.findById(id).then(function(data){
      data.destroy().then(function(user){
        res.json({
          deleted: 'success',
          data: data
        })
      })
    })
  },
  updateUser: function (req, res) {
    let id = req.params.id
    let username = req.body.username
    let email = req.body.email
    let password = hash.generate(req.body.password)
    user.findById(id).then(function(user){
      user.update({
        username: username,
        email: email,
        password: password
      }).then(function(user){
        res.json(user)
      })
    })
  },
  stopper: function(req, res){
    res.send('404')
  }
}

module.exports = userController
