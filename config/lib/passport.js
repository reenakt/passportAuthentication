'use strict';
var passport = require('passport'),
    mongoose = require('mongoose'),
    path = require('path'),
    User = require(path.join(process.cwd(), 'modules/core/server/models/core.server.model'));

  module.exports =  function(passport) {

       var User = mongoose.model('AuthUsers');

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function (id, done) {
        User.findOne({
                _id: id
            }, '-password -salt', function (err, user) {
                done(err, user);
            }
        )
    });

      require('../strategies/local.js')();
};




















