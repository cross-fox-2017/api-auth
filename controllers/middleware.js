const models = require('../models');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

var middleware = {

  login: function(req, res, next){
    console.log("berhasil masuk");
    models.User.findOne({
      where:{
        username:req.body.username
      }
    }).then(function(data){
      if(data == null){
        res.json("username tidak di temukan");
      }else if(passwordHash.verify(req.body.password, data.password)){
        console.log("berhasil login");
        next();
      }else{
        res.json("masukan password lain");
      }
    });
  },
  requireToken: function(req, res, next){
    /* get token from client */
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    /* verify token */
    if (token) {
      res.json("token tidak ada, anda belum login")
    }else{
      var decoded = jwt.verify(token, 'secret');
      console.log(decoded);
    }

    next();
  }

}

module.exports = middleware
