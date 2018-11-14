(function() {
  'use strict';

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $window, contentful) {

    // Get all entries
    contentful
      .entries("content_type=homePage")
      .then(

        // Success handler
        function(response){
          var entries = response.data;
          console.log(entries);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );

    $scope.innerWidth = $window.innerWidth;

    $window.addEventListener('resize', function() {
			$scope.innerWidth = $window.innerWidth;
			$scope.$apply();
		});

  }
})();
