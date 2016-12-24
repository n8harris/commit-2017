'use strict';

/**
 * @ngdoc function
 * @name commit2017App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the commit2017App
 */
angular.module('commit2017App')
  .controller('MainCtrl', function ($scope, Ref, $q, NUM_WEEKS_YEAR, Profanity) {
    removeError();
    Ref.child('Counter').child('numHoursCommited').on('value', function(snapshot) {
      var hours = snapshot.val();
      if (hours){
        $scope.numHoursCommited = hours;
        $scope.$apply();
      }
    });

    // provide a method for adding a message
    $scope.addCommit = function(commit, email, publicCommit) {
      removeError();
      if( commit && email ) {
        if (!emailIsValid(email)) {
          setError("Please enter valid email");
        } else if (Profanity.containsProfanity(commit)) {
          setError("Please watch your language :)");
        } else {
          var hours = 1;
          pushCommit(commit, email, publicCommit);
          incrementCounter(hours);
        }
      } else {
        setError("Please enter email and what you are committing to do");
      }
    };

    function getCounter() {
      var defered = $q.defer();
      Ref.child('Counter').once('value').then( function(snapshot) {
        defered.resolve(snapshot.val());
      });
      return defered.promise;
    }

    function pushCommit(commit, email, publicCommit) {
      Ref.child('Submissions').push({
        email: email,
        commit: commit,
        public: publicCommit
      });
    }

    function incrementCounter(hours) {
      hours *= NUM_WEEKS_YEAR;
      Ref.child('Counter').transaction(function(counter) {
          if (counter) {
              counter.numHoursCommited = counter.numHoursCommited + hours;
              counter.numSubmissions = counter.numSubmissions + 1;
          }
          return counter;
      });
    }

    function emailIsValid(email) {
      return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email);
    }

    function setError(message) {
      $scope.error = message;
    }

    function removeError() {
      $scope.error = "";
    }
  });
