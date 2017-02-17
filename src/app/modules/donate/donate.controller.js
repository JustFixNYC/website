(function() {
	'use strict';

	angular
		.module('boilerplate')
		.controller('DonateController', DonateController);

	/** @ngInject */
	function DonateController($scope, $window, $http, $document) {

		$scope.error = false;
		$scope.success = false;
		$scope.requesting = false;

		// Styles on Stripe form, to override default styles
		var style = {
			base: {
				fontSize: '16px',
				lineHeight: '1.3'
			}
		};

		// Set up our Stripe JS
		var displayError = $document.getElementById('card-errors');
		var displaySuccess = $document.getElementById('success-message');
		var stripe = $window.Stripe('pk_test_Yq8GeR8Vv7pZniDZW1JZwaTj');
		var elements = stripe.elements();
		var card = elements.create('card', {style: style});
		card.mount('#card-element');

		// Other opts set in form (CANNOT be part of stripe auth flow)
		$scope.donateObj = {
			amount: 20,
			subscription: true,
			email: ''
		}

		// Error tracker for card input
		card.addEventListener('change', function(event) {
			if (event.error) {
				$scope.error = true;
				displayError.textContent = event.error.message;
			} else {
				$scope.error = false;
				displayError.textContent = '';
			}
			$scope.$apply();
		});

		// Get token from Stripe
		$scope.makeCharge = function(donateForm) {

			var emailWorks = donateForm.email.$isEmpty(donateForm.email.$viewValue) !== true && donateForm.email.$valid === true;

			// Check if subscribed but email isn't valid
			if($scope.donateObj.subscription === true && !emailWorks){
				$scope.error = true;
				return displayError.textContent = 'please make sure the email form is complete and correct!';
			} else {

				return stripe.createToken(card).then(function(result) {
					if(result.error) {
						// Inform the user if there was an error
						$scope.error = true;
						var errorElement = $document.getElementById('card-errors');
						errorElement.textContent = result.error.message;
					} else {
						requestFromOurServer(result);
					}
				});	

			}
		}

		// Send to our server, request payment submit
		var requestFromOurServer = function(result) {

			var amt = $scope.donateObj.amount * 100;
			
			// Main body request, we'll handle subscription and email prefs on the server
			return $http.post('/api/donate', {
				data: result.token,
				amt: amt,
				subscription: $scope.donateObj.subscription,
				email: $scope.donateObj.email
			}).then(function(response){

				// Display success text if everything goes as planned
				if(response.data.status === 'succeeded') {
					$scope.error = false;
					$scope.success = true;
					displaySuccess.textContent = 'Thank you for your donation!';
				} else {
					$scope.error = true;
					displayError.textContent = response.data.message;
				}

			}, function(err) {
				// Err out
				$scope.error = true;
				displayError.textContent = err.data.message;

			});
		};
	}
})();
