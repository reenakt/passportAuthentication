
'use strict';
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,

  User =  require('mongoose').model('AuthUsers');

module.exports = function () {

    passport.use(new LocalStrategy(function(username, password, done) {

            User.findOne({ username:username}, function(err, user) {

                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));
}


module.exports = function(req,res,next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);

}

