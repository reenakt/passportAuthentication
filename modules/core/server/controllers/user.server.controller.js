'use strict';


    var userService = require('../services/user.server.services'),
    passport= require('passport');

module.exports.createUser = function (req,res) {

    var user = req.body;

    user.provider = 'local';

    userService.saveUser(user,function (err,user) {

        if (err) {
            console.log(err);
            res
                .status(400)
                .send({mesaage: "Internal error while saving data"})
        }

        else {
            res
                .status(200)
                .send("User has been registered successfully");
        }
    })

}

module.exports.login = function(req,res,next) {

    var user = req.body,
        username = req.body.username,
        pass = req.body.password;

   userService.login (username,pass, function (err,user) {
       if (err) {
           console.log(err);
           res
               .status(400)
               .send({mesaage: "Internal error while login data"})
       }

       else {
           res
               .status(200)
               .send("User has been login successfully");
       }

    })

}


module.exports.getUser = function(req,res){

    var user = req.body;

    userService.getUser(user,function(err,user){
        if(err){
            res
                .status(400)
                .send({message:"could not get the user"})
        }else {

            res.status(200);
            res.json(user);

        }
    });
}


module.exports.signout = function (req,res) {

    req.logout();
    res.redirect('/')
}
