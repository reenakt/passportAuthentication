'use strict';
angular
    .module('AuthenticationApp')
.config(function ($stateProvider) {

    $stateProvider
        .state('signUp',{

            url:'/signUp',
            templateUrl:'modules/core/client/views/signup.client.tpl.html'



            })
        .state('login',{
            url:'/login',
            templateUrl:'modules/core/client/views/login.client.tpl.html'
        })
        .state('profile',{
            url:'/profile',
            templateUrl:'modules/core/client/views/profile.client.tpl.html',

                controller: 'profileCtrl'
            })

})