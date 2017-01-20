(function() {
  'use strict';

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $window) {

    $scope.innerWidth = $window.innerWidth;

    $window.addEventListener('resize', function() {
			$scope.innerWidth = $window.innerWidth;
			$scope.$apply();
		});

  }
})();
