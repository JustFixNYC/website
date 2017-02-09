(function() {
	'use strict';

	angular
		.module('boilerplate')
		.controller('DonateController', DonateController);

	/** @ngInject */
	function DonateController($scope, $window) {

		$scope.error = false;
		$scope.requesting = false;

		$window.Stripe.setPublishableKey('pk_test_Yq8GeR8Vv7pZniDZW1JZwaTj');

		$scope.form = {
			number: '',
			cvc: '',
			exp_month: '',
			exp_year: '',
			address_zip: '' 
		};

		$scope.submit = function() {
			$scope.requesting = true;
			$scope.error = false;
			$window.Stripe.card.createToken($scope.form, requestFromOurServer);
		}

		var requestFromOurServer = function(responseCode, responseDetails) {

			console.log(responseCode);
			console.log(responseDetails);

			if(responseCode !== 200) {
				$scope.error = true;
				$scope.errorMessage = responseDetails.error.message;
				$scope.requesting = false;
				$scope.$apply();
			}
			/*
			return $http.post('/api/donate', {
				data: 'filename'
			}).then(function(response){
				console.log(response);
			}, function(err) {
				console.log(err);
			});*/
		};
	}
})();
