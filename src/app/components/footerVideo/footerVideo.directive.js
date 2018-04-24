(function() {
  'use strict';

  angular
    .module('boilerplate')
    .directive('footerVideo', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/components/footerVideo/footerVideo.html',
      };
    });

})();
