var db = require("../models");
var user = db.User
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken')
var config = require('../config')

module.exports = {
  list: function(req, res, next){
    db.User.findAll({raw:true}).then(function(users_data){
    res.json(users_data);
    })
  },

  find: function(req, res, next){
    db.User.findOne({
      where: {id: req.params.id}
    }).then(function(user){
      res.json({user});
    })
  },

  delete: function(req, res, next){
    db.User.findById(req.params.id).then(function(result){
      result.destroy().then(function(){
        res.send('Data with id: '+req.params.id+' has been deleted')
      })
    })
  },

  add: function(req, res, next){
    db.User.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      name: req.body.name,
      age: req.body.age}).then(function(user){
      res.json(user);
    })
  },

  signup: function(req, res, next){
    db.User.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      name: req.body.name,
      admin: req.body.admin,
      age: req.body.age}).then(function(user){
      res.json(user);
    })
  },

  update: function(req, res, next){
    db.User.findById(req.params.id).then(function(result){
      result.update({
        username: req.body.username,
        password: passwordHash.generate(req.body.password),
        name: req.body.name,
        age: req.body.age}).then(function(user){
        res.json(user);
      })
    })
  },

  signin: function(req, res, next){
    db.User.findOne({
      where: { username: req.body.username }
    }).then(function(hasil) {
      if(!hasil) {
        res.send('Anda belum melakukan registrasi')
      }
      if(passwordHash.verify(req.body.password, hasil.password)){
        var token = jwt.sign(hasil.dataValues, config.secret, {expiresIn: 60*60})
        res.json( {
          succes: true,
          message: 'Selamat Datang',
          token: token
      });
      } else {
        res.send('Silahkan masukkan username dan password yang sudah terdaftar')
      }
    })
  },

  cekdataUser: function(req, res, next){
    var decode = jwt.verify(req.header('token'),config.secret)
    if(decode && decode.admin == true){
      next()
    }
    else if (decode && decode.admin == false) {
      next()
    }
    else {
      res.send('anda tidak dapat login')
    }
  },

  cekdataAdmin: function(req, res, next){
    var decode = jwt.verify(req.header('token'),config.secret)
    if(decode && decode.admin == true){
      next()
    }
    else {
      res.send('anda bukanlah admin')
    }
  }
}
