let model      = require ('../models')
let user       = model.User;
const hash     = require('password-hash');

module.exports = {

    // Get all users
    getAllUser : function(req, res) {
      user.findAll().then(function (data) {
        res.send(data)
      })
    },

    // GET single user
    getUser : function(req, res) {
      user.findById(req.params.id).then(function (data) {
        res.send(data)
      })
    },

    // CREATE user
    createUser : function(req,res,next){
      user.create({username: req.body.username, password: hash.generate(req.body.password), role: req.body.role, createdAt: new Date(), updatedAt: new Date()})
      .then(function(data){
        res.send(data)
      })
    },

    //UPDATE
    updateUser : function(req,res){
      user.findById(req.params.id).then(function (data){
        data.update({username: req.body.username, password: hash.generate(req.body.password), role: req.body.role, updatedAt: new Date()})
        res.send(data)
        })
    },

    //DELETE
    deleteUser : function(req,res){
        user.findById(req.params.id)
        .then(function(data){
            data.destroy()
            .then(function(){
                res.send('data has been deleted')
            })
          })
    }

}
