'use strict';

/**
 * @ngdoc overview
 * @name commit2017App
 * @description
 * # commit2017App
 *
 * Main module of the application.
 */
angular.module('commit2017App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngProfanity',
    'ngTouch',
    'firebase',
    'firebase.ref'
  ]).constant('NUM_DAYS_YEAR', 365)
  .constant('NUM_WEEKS_YEAR', 52)
  .constant('NUM_MONTHS_YEAR', 52);
