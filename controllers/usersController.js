const models = require('../models');
var passwordHash = require('password-hash');
var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken');

module.exports = {
  userSignin: function(req, res, next) {
    if(!req.body.username){
      res.status(400).send('username required');
      return;
    }
    if(!req.body.password){
      res.status(400).send('password required');
      return;
    }

    models.Users.find({where:{username: req.body.username}}).then(function (user){
      if (passwordHash.verify(req.body.password, user.password) === null) {
        res.status(400).send('Invalid Password');
      } else {
        let myToken = jwt.sign({ username: req.body.username}, 'idabaguschahyadhegana120189')
        res.status(200).json(myToken);
      }
    });
  },
  createUser: function(req, res, next) {
    models.Users.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password)
    }).then((data) => {
      res.send(data)
    })
  },
  getUser: function(req, res, next) {
    models.Users.findById(req.params.id).then(function (data) {
      res.send({users: data})
    })
  },
  getUsers: function(req, res, next) {
    models.Users.findAll().then(function(data){
      res.send({users: data})
    })
  },
  deleteUser: function(req, res, next) {
    models.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      res.send({message: `User with id ${req.params.id} has been deleted`})
    })
  },
  updateUser: function(req, res, next) {
    models.Users.findById(req.params.id).then(function (data) {
      data.update({
        username: req.body.username,
        password: req.body.password
      })
    }).then((data) => {
      res.send({message: `User with id ${req.params.id} has been updated`})
    })
  }
};

// passwordHash.verify(req.body.password, data.password)
