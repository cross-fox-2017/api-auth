var models = require('../models')
var users = models.User
var jwt = require('jsonwebtoken');


module.exports = {
  displayAll: function(req, res, next) {
    users.findAll({
    }).then(function (user) {
      res.json(user)
    });
  },
  displayOne:function(req,res,next){
          users.findOne({
            where:{
              id:req.params.id
            }
          }).then(function(user) {
            res.json(user)
          })
  },
  delete:function(req, res, next) {
          users.destroy({where:{
            id : req.params.id
          }}).then(res.send('data berhasil dihapus'))
  },
  create:function(req,res,next) {
      users.create({
        username:req.body.username,
        email:req.body.email
      }).catch(function (err) {
        res.send(err.message)
      }).then(res.send('berhasil'))
  },
  updateUser:function(req,res,next){
          users.update({
            username:req.body.username,
            email:req.body.email
          },{where:{
            id:req.params.id
          }}).then(res.send('data berhasil di update'))
      }
}
