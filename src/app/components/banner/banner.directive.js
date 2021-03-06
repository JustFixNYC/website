(function() {
  'use strict';

  angular
    .module('boilerplate')
    .directive('banner', banner);

  /** @ngInject */
  function banner() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/banner/banner.html',
      scope: false,
      controllerAs: 'vm',
      link: linkFunc,
      controller: bannerController,
      bindToController: true
    };

    function linkFunc() {
    }

    /** @ngInject */
    function bannerController($scope, $state) {
			$scope.$state = $state;
    }

    return directive
  }

})();