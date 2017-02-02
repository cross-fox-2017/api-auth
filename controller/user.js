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
              res.send(jwt.sign({id: result.id, role: req.body.role, expiresIn: '1h'},"CODEuntukDECODE"))
            }else{
              res.send("Periksa Kembali User dan Pasword")
            }
          }else{
            res.send("User Belum Terdaftar")
          }
        })
    },
    getAllData: function(req, res, next) {
      jwt.verify(req.params.token,'CODEuntukDECODE', function(err, decoded) {
        console.log(decoded);
        if(decoded.role == "admin"){
          models.User.findAll().then(function(data) {
            res.send(data)
          })
        }else if(decoded.role == "user"){
            res.send("Halaman Hanya Bisa Diakses Oleh Admin")
        }else{
            res.send("Silahkan Login Terlebih Dahulu")
        }
      })
    },
    getById: function(req, res, next) {
      jwt.verify(req.params.token,'CODEuntukDECODE', function(err, decoded) {
        if(decoded.role.toUpperCase() == "ADMIN" || decoded.role.toUpperCase() == "USER"){
          models.User.findById(req.body.id).then(function(data) {
              res.send(data)
          })
        }else{
            res.send("Silahkan Login Terlebih Dahulu")
        }
      })
    },
    createUser: function(req, res, next) {
      jwt.verify(req.params.token,'CODEuntukDECODE', function(err, decoded) {
        if(decoded.role.toUpperCase() == "ADMIN"){
          models.User.create({
              user: req.body.user,
              password: passwordHash.generate(req.body.password),
              role: req.body.role || "user"
          }).then(function(data) {
              res.send(data)
          })
        }else if(decoded.role.toUpperCase() == "USER"){
            res.send("Halaman Hanya Bisa Diakses Oleh Admin")
        }else{
            res.send("Silahkan Login Terlebih Dahulu")
        }
      })
    },
    delete: function(req, res, next) {
      jwt.verify(req.params.token,'CODEuntukDECODE', function(err, decoded) {
        if(decoded.role.toUpperCase() == "ADMIN"){
          var tampilData
          models.User.findById(req.params.id).then(function(data) {
              tampilData = data
              data.destroy()
          }).then(function() {
              // res.send("Data Terhapus")
              res.send(tampilData)
          })
        }else if(decoded.role.toUpperCase() == "USER"){
            res.send("Halaman Hanya Bisa Diakses Oleh Admin")
        }else{
            res.send("Silahkan Login Terlebih Dahulu")
        }
      })
    },
    updateData: function(req, res, next) {
      jwt.verify(req.params.token,'CODEuntukDECODE', function(err, decoded) {
        if(decoded.role.toUpperCase() == "ADMIN" || decoded.role.toUpperCase() == "USER"){
          models.User.findById(req.body.id).then(function(data) {
              data.update({
                  user: req.body.user,
                  password: passwordHash.generate(req.body.password),
                  role: req.body.role || "user"
              }).then(function(showData) {
                  res.send(showData)
              })
          })
        }else{
            res.send("Silahkan Login Terlebih Dahulu")
        }
      })
    }
}
