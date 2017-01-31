var express = require('express');
var router = express.Router();
let models = require('../models');
let hash = require('password-hash');
let userController = require ('../controllers/users_controller');
let app = express();
let jwt = require('jsonwebtoken');

module.exports = {
  'secret': 'ilovescotchyscotch',
  getUsers: (req, res) => {
    models.Users.findAll().then(function (data) {
      res.send({users:data})
    })
  },
  getUser: (req, res) => {
    models.Users.findById(req.params.id).then(function (data) {
      res.send({user:data})
    })
  },
  createUser: (req, res) => {
    models.Users.create({
      username: req.body.username,
      password: hash.generate(req.body.password),
      role: req.body.role,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function (data) {
      res.json({data})
    })
  },
  deleteUser: (req, res) => {
    models.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(`Delete user with ID: ${req.params.id}`)
    })
  },
  updateUser: (req, res) => {
    models.Users.findById(req.params.id).then(function (findUser) {
      findUser.update({
        username: req.body.username,
        password: hash.generate(req.body.password),
        role: req.body.role,
        updatedAt: new Date()
      }).then(function (data) {
        res.json({data, message: "Data has been updated"})
      })
    })
  },
  signUp: (req, res) => {
    models.Users.create({
      username: req.body.username,
      password: hash.generate(req.body.password),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function (data) {
      res.json({success: true});
      // res.send(`User:\nname:${req.body.username}\npassword:${req.body.password}\nrole:${req.body.role}\nhas been created`)
    })
  },
  signIn: (req, res) => {
    models.Users.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (data) {
      if(data.username !== req.body.username) {
        res.json({success:false, message: 'Authentication failed. User not found.'})
      }
      else {
        if (hash.verify(req.body.password, data.password)) {
          var token = jwt.sign(data, "ilovescotchyscotch");
           // expires in 24 hours
          res.json({
            sucess: true,
            message: 'Enjoy your token!',
            token: token
          })
        }
        else {
          res.json({success:false, message: 'Authentication failed. Wrong password.'})
        }
      }
    })
  }
}
