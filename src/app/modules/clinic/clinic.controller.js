(function() {
  'use strict';

  angular
    .module('boilerplate')
    .controller('ClinicController', ClinicController);

  /** @ngInject */
  function ClinicController($timeout, $scope, contentful, $sce) {
    var vm = this;

    // // Thinking maybe we set this entire page up from this scope?
    // contentful
    //  	.entry('3sQl7zDqL6ioCEowWISyEm')
    //   .then(function(response){
    // 		$scope.fields = response.data.fields;
    //     console.log(response);
    // 	}, function(error) {
    // 		console.log(error);
    // 	});


  }
})();
