'use strict'

const express = require('express');
const app = express();
const models = require('../models')

let user = models.User

let middleware = {
  adminCek: function(req, res, next) {
    if(req.decoded.role == 'admin'){
      next()
    } else {
      res.json({
        admin: false
      })
    }
  }
}

module.exports = middleware
