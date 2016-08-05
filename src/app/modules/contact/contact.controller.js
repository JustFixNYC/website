(function() {
  'use strict';

  angular
    .module('boilerplate')
    .controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController($timeout, $scope, contentful, $sce) {
    var vm = this;

  // Thinking maybe we set this entire page up from this scope?
  contentful
   	.entry('4IoOkPvasEAOseQuE2sAa8')
    .then(function(response){
  		$scope.fields = response.data.fields;
  		$scope.address = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=loc:' + 
  			$scope.fields.address.lat + ',' + $scope.fields.address.lon +
  			'&key=AIzaSyBA3d0_6MzeFC82avGLRiFzI2Mj0cvx_iQ');
  	},
  	function(error) {
  		console.log(error);
  	});


  }
})();
