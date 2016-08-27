'use strict';
var express = require('express'); //3rd party module
var bodyParser = require('body-parser'),
    consolidate = require('consolidate'),
    swig = require('swig'),
    path = require('path'),
    config = require('../config'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport');

module.exports.initBodyParser = function(app) {
    app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
    app.use(bodyParser.json())
};

module.exports.initSession= function (app) {

    app.use(session({
        saveUninitalized: true,
        resave:true,
        secret: 'welcome'
    }))
}

module.exports.initPassport = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

}

module.exports.init = function(){
    var app = express();

    this.initBodyParser(app);
    this.initViewEngine(app);
    this.initIgnoreStaticRoutes(app);
    this.initSession(app);
    this.initPassport(app);
    return app;
}

module.exports.initViewEngine = function(app){
    
    app.engine('server.view.html',consolidate['swig']);
    app.set('view engine','server.view.html');
    app.set('views',path.join(process.cwd(),'/modules/core/server/views'));
}

module.exports.initIgnoreStaticRoutes = function (app) {
    app.use('/public',express.static(path.resolve('./public')));

    config.client.files.forEach(function(staticPath){
        app.use(staticPath,express.static(path.resolve('./'+staticPath)))
    })
}