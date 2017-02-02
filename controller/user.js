const models = require('../models')

module.exports = {
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
            password: req.body.password
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
                password: req.body.password
            }).then(function(showData){
                res.send(showData)
            })
        })
    }
}
