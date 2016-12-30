'use strict';
/**
 * @ngdoc overview
 * @name commit2017App:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 */
angular.module('commit2017App')

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({redirectTo: '/'});
    $locationProvider
      .html5Mode(true);
  }]);
