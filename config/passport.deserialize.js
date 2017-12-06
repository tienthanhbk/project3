var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');
var User = require('../models/User.model');

passport.deserializeUser(function(key, next) {
  const id = key.id;
  const type = key.type;

  console.log('key: ', key);

  if(type == 'customer') {
    User.getById(id, (err, user) => {
      if(err) { return next(err) };
      next(null, user);
    })
  }
});
