const models = require('../models')
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

module.exports = {
    signup: function(req, res, next) {
        models.User.create({
            user: req.body.user,
            password: passwordHash.generate(req.body.password),
            role: req.body.role || "user"
        }).then(function(data) {
            res.send(data)
        })
    },

    signin: function(req, res, next) {
        models.User.find({
            where: {
                user: req.body.user
            }
        }).then(function(result) {
          if(result){
            if(passwordHash.verify(req.body.password,result.password)==true){
              //iat : session token berakhir dalam 30 detik
              res.send(jwt.sign({id: result.id, iat: Math.floor(Date.now() / 1000)-30},"CODEuntukDECODE"))
            }else{
              res.send("Periksa Kembali User dan Pasword")
            }
          }else{
            res.send("User Belum Terdaftar")
          }
        })
    },

    getAllData: function(req, res, next) {
        models.User.findAll().then(function(data) {
            res.send(data)
        })
    },
    getById: function(req, res, next) {
        models.User.findById(req.params.id).then(function(data) {
            res.send(data)
        })
    },
    createUser: function(req, res, next) {
        models.User.create({
            user: req.body.user,
            password: passwordHash.generate(req.body.password),
            role: req.body.role || "user"
        }).then(function(data) {
            res.send(data)
        })
    },
    delete: function(req, res, next) {
        var tampilData
        models.User.findById(req.params.id).then(function(data) {
            tampilData = data
            data.destroy()
        }).then(function() {
            // res.send("Data Terhapus")
            res.send(tampilData)
        })
    },
    updateData: function(req, res, next) {
        models.User.findById(req.params.id).then(function(data) {
            data.update({
                user: req.body.user,
                password: passwordHash.generate(req.body.password),
                role: req.body.role || "user"
            }).then(function(showData) {
                res.send(showData)
            })
        })
    }
}
