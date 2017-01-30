const models = require('../models');
var jwt = require('jsonwebtoken');

var users = {
  login: function(req, res, next){
    models.User.findAll({}).then(function(data){
      res.json(data);
    })
  }
  /* get all users */
  getAllUser : function(req, res, next) {
    models.User.findAll({}).then(function(data){
      res.json(data);
    })
  },
  /* get a single user */
  getOneUser : function(req, res, next){
    models.User.findById(req.params.id).then(function(data) {
      res.json(data);
    })
  },
  /* create user */
  createOneUser : function(req, res, next){
    models.User.create({username: req.body.username, password: req.body.password}).then(function(data){
      console.log(data);
      res.json(data);
    })
  },
  /* delete one user */
  deleteOneUser : function(req, res, next){
    models.User.findById(req.params.id).then(function(data) {
      data.destroy()
      res.json("data terhapus")
    })
  },
  /* edit one user */
  editOneUser : function(req, res, next){
    // localhost:3000/api/users/1?username="admin"&password="admin"

    models.User.update({ username: req.body.username, password: req.body.password },{ where: { id: req.params.id } })
    .then(function(data){
      return models.User.findById(req.params.id);
    }).then(function(dataUser){
      res.json(dataUser)
    }).catch(function(err){
      res.json(err)
    });

  }
}

module.exports = users
