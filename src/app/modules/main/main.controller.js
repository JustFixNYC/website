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

    $scope.$watch('innerWidth', function(oldVal, newVal) {
			if(newVal < 768) {
				$scope.flowUrl = '/img/flow_home_vertical.svg';
			} else {
				$scope.flowUrl = '/img/flow_home_horizontal.svg';
			}
    });

  }
})();
