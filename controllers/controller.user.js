const models = require('../models');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

var users = {
  /* login */
  login: function(req, res, next){
    console.log("berhasil next");
    // models.User.findOne({
    //   where:{
    //     username:req.body.username
    //   }
    // }).then(function(data){
    //   if(data == null){
    //     res.json("username tidak di temukan");
    //   }else if(passwordHash.verify(req.body.password, data.password)){
    //     res.json("berhasil login");
    //   }else{
    //     res.json("masukan password lain");
    //   }
    // })
  },
  /* get all users */
  getAllUser : function(req, res, next) {
    models.User.findAll({}).then(function(data){
      console.log(data);
      res.json(data);
    })
  },
  /* get a single user */
  getOneUser : function(req, res, next){
    models.User.findById(req.params.id).then(function(data) {
      console.log(data);
      res.json(data);
    })
  },
  /* create user */
  createOneUser : function(req, res, next){
    let hashedPassword = passwordHash.generate(req.body.password);
    models.User.create({username: req.body.username, password: hashedPassword}).then(function(data){
      console.log(data);
      res.json(data);
    })
  },
  /* delete one user */
  deleteOneUser : function(req, res, next){
    models.User.findById(req.params.id).then(function(data) {
      data.destroy()
      res.json("data dengan id : " + data.id + " berhasil di hapus")
    })
  },
  /* edit one user */
  editOneUser : function(req, res, next){
    // localhost:3000/api/users/1?username="admin"&password="admin"
    let hashedPassword = passwordHash.generate(req.body.password);
    models.User.update({ username: req.body.username, password: hashedPassword },{ where: { id: req.params.id } })
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
