var db = require("../models");
var user = db.User
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken')
var config = require('../config')

module.exports = {
  list: function(req, res, next){
    db.User.findAll().then(function(result){
    res.json(result);
    })
  },

  find: function(req, res, next){
    db.User.findOne({
      where: {id: req.params.id}
    }).then(function(result){
      res.json(result);
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
      age: req.body.age}).then(function(result){
      res.json(result);
    })
  },

  signup: function(req, res, next){
    db.User.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      name: req.body.name,
      admin: true,
      age: req.body.age}).then(function(result){
      res.json(result);
    })
  },

  update: function(req, res, next){
    db.User.findById(req.params.id).then(function(result){
      result.update({
        username: req.body.username,
        password: passwordHash.generate(req.body.password),
        name: req.body.name,
        admin: req.body.admin}).then(function(result){
        res.json(result);
      })
    })
  },

  signin: function(req, res, next){
    db.User.findOne({
      where: { username: req.body.username }
    }).then(function(result) {
      if(!result) {
        res.send('Anda belum melakukan registrasi')
      }
      if(passwordHash.verify(req.body.password, result.password)){
        var token = jwt.sign(result.dataValues, config.secret, {expiresIn: 60*60})
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
      res.send('anda tidak memiliki hak untuk akses data')
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
