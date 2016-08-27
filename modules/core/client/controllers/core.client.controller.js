'use strict';
angular
    .module('AuthenticationApp')
    .controller('signupCtrl' , ['$scope','AuthService','$state', function ($scope,AuthService,$state) {

        $scope.signUp = function (user) {

            var signUpPromise = AuthService.createUser(user);

            var successCallback = function (response) {
                console.log("success");

                $state.go('profile');
            }

            var failureCallback = function (err) {

                console.log("Error while signup")
            }


            signUpPromise

                .success(successCallback)
                .error(failureCallback);
        }
    }] )

    .controller('logInCtrl' , ['$scope','AuthService','$state', function ($scope,AuthService,$state) {

        $scope.signIn = function (user) {

            var signInPromise = AuthService.findUser(user);

            var successCallback = function (response) {
                console.log("success");

                $state.go('profile');


            }

            var failureCallback = function (err) {

                console.log("Error while login")
            }


            signInPromise

                .success(successCallback)
                .error(failureCallback);
        }
    }] )

    .controller('profileCtrl' , ['$scope','AuthService', function ($scope,AuthService) {

        var userPromise = AuthService.getUser();

            var successCallback = function (response) {
                console.log("success");
                $scope.users= response;


            var failureCallback = function (err) {

                console.log("Error")
            }


            userPromise

                .success(successCallback)
                .error(failureCallback);
        }
    }] )
