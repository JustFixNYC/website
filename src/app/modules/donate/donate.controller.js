(function() {
	'use strict';

	angular
		.module('boilerplate')
		.controller('DonateController', DonateController);

	/** @ngInject */
	function DonateController($scope, $window, $http, $document, $filter) {

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
		var displayError = $document[0].getElementById('card-errors');
		var displaySuccess = $document[0].getElementById('success-message');
		var stripe = $window.Stripe('pk_test_Yq8GeR8Vv7pZniDZW1JZwaTj');
		var elements = stripe.elements();
		var card = elements.create('card', {style: style});
		card.mount('#card-element');

		// Other opts set in form (CANNOT be part of stripe auth flow)
		$scope.donateObj = {
			amount: '20.03',
			subscription: false,
			email: ''
		}

		// Not a big fan of this stuff...
		$scope.$watch('donateObj.amount', function(input) {
			console.log(input.indexOf('.'), input.length);
			if(input.indexOf('.') < 0) {
				input = input + '.00';
			} else if (input.indexOf('.') + 1 === input.length - 1){
				$scope.donateObj.amount = input + '0';
			} else if (input.indexOf('.') < input.length + 1){
				$scope.donateObj.amount = input.substring(0, input.indexOf('.') + 3);
			}
		});

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
				return displayError.textContent = 'Please make sure the email form is complete and correct!';
			} else {

				return stripe.createToken(card).then(function(result) {
					if(result.error) {
						// Inform the user if there was an error
						$scope.error = true;
						displayError.textContent = result.error.message;
					} else {
						requestFromOurServer(result);
					}
				});	

			}
		}

		// Send to our server, request payment submit
		var requestFromOurServer = function(result) {

			if(parseInt($scope.donateObj.amount) === NaN) {
				displayError.textContent = 'Please enter a valid amount to donate!';
				return $scope.error = true;
			}

			var amt = $scope.donateObj.amount * 100;
			
			// Main body request, we'll handle subscription and email prefs on the server
			return $http.post('/api/donate', {
				data: result.token,
				amt: amt,
				subscription: $scope.donateObj.subscription,
				email: $scope.donateObj.email
			}).then(function(response){
				console.log(response);
				// Display success text if everything goes as planned
				if(response.data.status === 'succeeded') {
					$scope.error = false;
					$scope.success = true;
					console.log(response.data);
					displaySuccess.textContent = 'Thank you for your donation of $' + (response.data.amount / 100).toFixed(2) + '!';
				} else {
					$scope.error = true;
					displayError.textContent = response.data.message;
				}

			}, function(err) {
				// Err out
				console.log(err);
				$scope.error = true;
				displayError.textContent = err.data.message;

			});
		};
	}
})();
