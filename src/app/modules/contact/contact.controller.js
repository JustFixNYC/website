(function() {
  'use strict';

  angular
    .module('boilerplate')
    .controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController($timeout, $scope) {
    var vm = this;
    console.log($scope);


  }
})();
