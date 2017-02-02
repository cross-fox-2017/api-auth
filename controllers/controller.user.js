const models = require('../models')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')

var users = {
  /* login */
  login: function (req, res) {
    models.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (data) {
      console.log({data})

      if (data === null) {
        res.send({message: 'username tidak cocok dengan password'})
      } else if (passwordHash.verify(req.body.password, data.password)) {
        return data
      }
    }).then(function (data) {
      const token = jwt.sign({
        sub: data.id,
        username: data.username,
        expiresIn: '1d'
      }, `${process.env.SECRET}`)

      res.send({token: token})
    })
  },

  /* get all users */
  getAllUser: function (req, res) {
    models.User.findAll({}).then(function (data) {
      console.log(data)
      res.send(data)
    })
  },

  /* get a single user */
  getOneUser: function (req, res) {
    models.User.findById(req.params.id).then(function (data) {
      console.log(data)
      res.send(data)
    })
  },

  /* create user */
  createOneUser: function (req, res) {
    let hashedPassword = passwordHash.generate(req.body.password)
    models.User.create({username: req.body.username, password: hashedPassword}).then(function (data) {
      console.log(data)
      res.send(data)
    })
  },

  /* delete one user */
  deleteOneUser: function (req, res) {
    models.User.findById(req.params.id).then(function (data) {
      data.destroy()
      res.send('data dengan id : ' + data.id + ' berhasil di hapus')
    })
  },

  /* edit one user */
  editOneUser: function (req, res) {
    // localhost:3000/api/users/1?username="admin"&password="admin"
    let hashedPassword = passwordHash.generate(req.body.password)
    models.User.update({ username: req.body.username, password: hashedPassword }, { where: { id: req.params.id } })
      .then(function (data) {
        return models.User.findById(req.params.id)
      }).then(function (dataUser) {
      res.send(dataUser)
    }).catch(function (err) {
      res.send(err)
    })
  },

  getAdminProfile: function (req, res) {
    res.send({profile: req.user})
  }
}

module.exports = users
