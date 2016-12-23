'use strict';

/**
 * @ngdoc function
 * @name commit2017App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the commit2017App
 */
angular.module('commit2017App')
  .controller('MainCtrl', function ($scope, Ref, $q) {
    getCounter().then(function(counter){
      $scope.numHoursCommited = counter.numHoursCommited;
    });
    Ref.child('Counter').on('child_changed', function(snapshot) {
      $scope.numHoursCommited = snapshot.val();
    });

    // provide a method for adding a message
    $scope.addCommit = function(commit, email) {
      if( commit && email ) {
        pushCommit(commit, email);
        incrementCounter();
      }
    };

    function getCounter() {
      var defered = $q.defer();
      Ref.child('Counter').once('value').then( function(snapshot) {
        defered.resolve(snapshot.val());
      });
      return defered.promise;
    }

    function pushCommit(commit, email) {
      Ref.child('Submissions').push({
        email: email,
        commit: commit
      });
    }

    function incrementCounter() {
      Ref.child('Counter').transaction(function(counter) {
          if (counter) {
              counter.numHoursCommited = counter.numHoursCommited + 1;
              counter.numSubmissions = counter.numSubmissions + 1;
          }
          return counter;
      });
    }
  });
