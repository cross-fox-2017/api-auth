const models = require('../models');
var passwordHash = require('password-hash');


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
  }

}

module.exports = middleware
