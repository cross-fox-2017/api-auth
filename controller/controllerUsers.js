var models = require('../models');
var hash = require('password-hash');

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
      models.User.create({username: req.body.username ,password: hash.generate(req.body.password)}).then(function (data) {
          res.send(data)
        })
    },

    deleteUser : function(req, res, next) {
      models.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(){
      res.send('data has been deleted')
    })
    },

    updateUser : function(req, res, next) {
      models.User.findById(req.params.id).then(function (data) {
        data.update({
          username: req.body.username,
          password: hash.generate(req.body.password),
          updateAt: new Date()
        })
      }).then(function(){
      res.send('data has been updated')
    })
    }

}
