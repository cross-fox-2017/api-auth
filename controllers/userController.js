const model = require('../models')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')

module.exports = {
  getAllUser: function (req, res) {
    model.User.findAll().then(function (result) {
      res.send({result})
    })
  },

  getSingleUser: function (req, res) {
    model.User.findById(req.params.id).then(function (result) {
      res.send({result})
    })
  },

  signupUser: function (req, res) {
    model.User.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      name: req.body.name,
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date()

    }).then(function (user) {
      if (user)
        res.send(user)
      else
        res.send({message: `Something Wrong`})
    })
  },

  signinUser: function (req, res) {
    model.User
      .find({
        where: { username: req.body.username }
      })
      .then(function (data) {
        // create token
        const token = jwt.sign({
          username: data.username,
          role: data.role
        }, `${process.env.SECRET}`)
        return token
      }).then(function (token) {
      res.send({ token: token  })
    }).catch(function (err) {
      res.send({message: err})
    })
  },

  setRole: function (req, res) {
    model.User
      .find({
        where: { username: req.body.username }
      })
      .then(function (data) {
        data.updateAttribute({
          role: req.body.role
        })
        res.send({ role: req.body.role })
      }).catch(function (err) {
      res.send({message: err})
    })
  },

  deleteUser: function (req, res) {
    model.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (user) {
      res.send({message: `User with id: ${req.params.id} is deleted`})
    })
  },

  updateUser: function (req, res) {
    model.User.findById(req.params.id).then(function (user) {
      user.update({
        email: req.body.email
      })
      res.send({message: `User with id: ${req.params.id}. are change the email ! `})
    })
  },

  verify: function (req, res, next) {

    // Check for token from various ways
    let token
    if (req.body.token) token = req.body.token
    else if (req.query.token) token = req.query.token
    else if (req.headers.authorization) token = req.headers.authorization.split(' ')[1]
    else token = 0

    jwt.verify(token, `${process.env.SECRET}`, function (err, decoded) {
      if (decoded.role == 'user') res.send({message: 'get the hell out here'})
      else next()

    // if (decoded.role == 'admin') {
    //   next()
    // }else {
    //   res.send({message: 'Get the hell out here !'})
    // }
    })
  }

}
