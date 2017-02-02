const models = require('../models')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')

var middleware = {
  /* decodeToken is a middleware for check that users give token or not, if users have a token and then that token passing to the next middleware by variable req.decoded  */
  decodeToken: function (req, res, next) {
    /* get token from client */
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || 0
    /* verify token */
    if (token === 0) {
      req.decoded = 0
    } else {
      req.decoded = jwt.verify(token, `${process.env.SECRET}`)
    }
    next()
  },
  /* validateUser is a middleware for check that token have been decoded and become a object, verify that object valide(token exparit or user not found) or not  */
  validateUser: function (req, res, next) {
    console.log('validating........', req.decoded)

    if (req.decoded === 0) {
      req.user = 'unavailable'
      next()
    } else {
      models.User.findOne({
        where: { id: req.decoded.sub }
      }).then(function (user) {
        console.log({user})

        if (!user) {
          res.send({message: 'user tidak valid'})
        } else {
          req.user = user
          next()
        }
      })
    }
  }

}

module.exports = middleware
