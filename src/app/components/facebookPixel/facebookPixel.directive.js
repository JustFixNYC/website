(function() {
  'use strict';

  angular
    .module('boilerplate')
    .directive('fbTrack', fbTrack);

  /** @ngInject */
  function fbTrack() {
    var directive = {
      restrict: 'A',
      scope: true,
      link: linkFunc,
      controller: fbTrackController,
      bindToController: true
    };

    return directive;

    function linkFunc(scope, el, attr) {

      el.bind('click', function() {

        fbq('track', 'CompleteRegistration', {
        });
        
      });

    }

    /** @ngInject */
    function fbTrackController() {
    }
  }

})();
