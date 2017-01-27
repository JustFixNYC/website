(function() {
  'use strict';

  angular
    .module('boilerplate')
    .controller('AboutController', AboutController);

  /** @ngInject */
  function AboutController($scope, $state) {

    $scope.$watch('innerWidth', function(oldVal, newVal) {
			if(newVal < 768) {
				$scope.flowUrl = '/img/flow_home_vertical.svg';
			} else {
				$scope.flowUrl = '/img/flow_home_horizontal.svg';
			}
    });

    $scope.$state = $state;

  }
})();
