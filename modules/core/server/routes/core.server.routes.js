'use strict';

module.exports = function(app){
    
    var controller = require('../controllers/user.server.controller'),
        mainController = require('../controllers/main.server.controller'),
        passport = require('passport');

    //contact collection and creation


    app
        .route('/')
        .get(mainController.index);

    app
        .route('/api/signup')
        .post(controller.createUser)

    app
        .route('/api/login')
        .post(controller.login)
        .post(passport.authenticate('local',{
            successRedirect:'/api/profile',
            failureRedirect:'/api/login',
            failureFlash:true
        }));

    app
        .route('/api/profile/')
        .get(controller.getUser)



    app
    .get('/signout',controller.signout);

}
