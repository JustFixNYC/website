(function() {
  'use strict';

  angular
    .module('boilerplate')
    .directive('footerVideo', footerVideo);

  /** @ngInject */
  function footerVideo() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/footerVideo/footerVideo.html',
      scope: false,
      controllerAs: 'vm',
      link: linkFunc,
      controller: footerVideoController,
      bindToController: true
    };

    function linkFunc() {
    }

    /** @ngInject */
    function footerVideoController() {
    }

    return directive
  }

})();
