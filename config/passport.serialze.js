var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');
var User = require('../models/User.model');

passport.serializeUser(function(accoutInfo, next) {
  const key = {
    id: '',
    type: ''
  }
  if(accoutInfo.idUser) {
    key.type = 'customer';
    key.id = accoutInfo.idUser;
    return next(null, key);
  }
  if(accoutInfo.idadmin) {
    key.type = 'admin';
    key.id = accoutInfo.idadmin;
    return next(null, key);
  }
  next(null, accoutInfo.idUser);
});
