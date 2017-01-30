'use strict'

const models = require('../models')
const hash = require('password-hash')
let user = models.User

let userController = {
  signup: function (req, res){
    let name = req.body.name
    let email = req.body.email
    let password = hash.generate(req.body.password)
    user.create({{name: name, email: email, password: password, role: 'user'}).then(function(data){
      res.json(data)
    })
  },
  signin: function (req, res) {

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
    let name = req.body.name
    let email = req.body.email
    let password = hash.generate(req.body.password)
    let role = req.body.role
    user.create({name: name, email: email, password: password, role: role}).then(function(data){
      res.json(data)
    })
  },
  getUser: function (req, res) {
    let id = req.params.id
    user.findById(id).then(function(user){
      res.json(user)
    })
  },
  deleteUser: function (req, res) {
    let id = req.params.id
    user.findById(id).then(function(data){
      data.destroy().then(function(user){
        res.json(data)
      })
    })
  },
  updateUser: function (req, res) {
    let id = req.params.id
    let name = req.body.name
    let email = req.body.email
    let password = hash.generate(req.body.password)
    user.findById(id).then(function(user){
      user.update({
        name: name,
        email: email,
        password: password
      }).then(function(user){
        res.json(user)
      })
    })
  }
}

module.exports = userController
