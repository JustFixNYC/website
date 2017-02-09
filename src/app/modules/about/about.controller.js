(function() {
  'use strict';

  angular
    .module('boilerplate')
    .controller('AboutController', AboutController);

  /** @ngInject */
  function AboutController($scope, $state) {

    $scope.$state = $state;

  }
})();
