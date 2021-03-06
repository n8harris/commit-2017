'use strict';

angular.module('commit2017App')
  .service('abbreviate_number', function() {
    return function (value) {
        var newValue = value;
        var shortNum = value;
        var newValue = value;
        if (value >= 1000000) {
            var suffixes = ["", "K", "M", "B","T"];
            var suffixNum = Math.floor( (""+value).length/3 );
            var shortValue = '';
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
            if (shortValue % 1 != 0){
              shortNum = shortValue.toFixed(1);
            }
            newValue = shortValue+suffixes[suffixNum];
            return {value: newValue, abbreviated: true};
        }
        if (newValue){
          return {value: newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), abbreviated: false};
        } else {
          return {value: newValue, abbreviated: false};
        }
    };
  });