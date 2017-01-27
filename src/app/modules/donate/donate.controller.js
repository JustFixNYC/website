(function() {
	'use strict';

	angular
		.module('boilerplate')
		.controller('DonateController', DonateController);

	/** @ngInject */
	function DonateController($scope, $window, $http) {

		$window.Stripe.setPublishableKey('pk_test_Yq8GeR8Vv7pZniDZW1JZwaTj');

		$scope.form = {
			number: '',
			cvc: '',
			exp_month: '',
			exp_year: '',
			address_zip: '' 
		};

		$scope.submit = function() {
			$http.post('/api/donate', {
				data: 'filename'
			}).then(function(response){
				console.log(response);
			}, function(err) {
				console.log(err);
			});
		};
	}
})();
