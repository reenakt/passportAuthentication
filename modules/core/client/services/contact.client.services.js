'use strict';

 angular
 .module('AuthenticationApp')

  .factory('AuthService',function($http){

      var _createUser = function (user) {

          var promise = $http.post('/api/signup',user)

          return promise;
      }

      var _findUser = function (user) {

          var promise = $http.post('/api/login',user)

          return promise;
      }

      var _getUser = function(){

          var promise = $http.get('/api/profile')

          return promise;
      }




      return{
          createUser : _createUser,
          findUser: _findUser,
          getUser: _getUser

      }



  })