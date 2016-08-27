
'use strict';

var mongoose = require('mongoose'),

    passport= require('passport'),

    User = mongoose.model('AuthUsers');


module.exports.saveUser = function(savableUser,callback){

    var user = new User(savableUser);

    user.save(function (err) {
        if(err){
            callback(err);
        }
        callback(null,user);
    });

}

module.exports.login = function (username,pass,callback) {

    User.findOne({username: username, password: pass}, function (err, user) {

        if (err) throw err;

        if(!user){
            callback(false,null);
        }else {
            callback(null, user);
        }

    })
}



module.exports.getUser = function(user,callback){

    User.find({},{__v:0},function(err,user){

        if(err) throw err;

        callback(null,user);
    });
}