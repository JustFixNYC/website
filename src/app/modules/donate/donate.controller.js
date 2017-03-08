(function() {
	'use strict';

	angular
		.module('boilerplate')
		.controller('DonateController', DonateController);

	/** @ngInject */
	function DonateController($scope, $window, $http, $document, $log) {

		// Error messaging, globals that can't be used in the DOM or model below (changing via DOM manipulation doesn't work on obj properties)
		$scope.error = false;
		$scope.errorMessage;
		$scope.success = false;
		$scope.requesting = false;
		$scope.otherAmt = false;
		$scope.subscription = false;
		$scope.unsubscription = false;

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
		// var card = elements.create('card', {style: style});
		// create all our elements, attach them to the DOM, save them all into an array for ease of event listener attachment
		var cardNumber = elements.create('cardNumber', {style: style});
		var cardExpiry = elements.create('cardExpiry', {style: style});
		var cardCvc = elements.create('cardCvc', {style: style});
		var postalCode = elements.create('postalCode', {style: style});
		cardExpiry.mount('#card-element-expiry');
		cardNumber.mount('#card-element-number');
		cardCvc.mount('#card-element-cvc');
		postalCode.mount('#card-element-postal');
		var elementsArray = [cardNumber, cardExpiry, cardCvc, postalCode];


		// Other opts set in form (CANNOT be part of stripe auth flow)
		$scope.donateObj = {
			amount: undefined,
			email: '',
			name: ''
		}

		// Using buttons to change amount (gets rid of the custom amount field)
		$scope.changeAmt = function(amt) {
			if(amt === 'other') {
				$scope.donateObj.amount = undefined;
				return $scope.otherAmt = true;	
			}
			$scope.donateObj.amount = amt;
			$scope.otherAmt = false;
		}

		// Update subscriptions
		$scope.toggleSubscription = function(val) {
			// User wants to subscribe
			if(val === true) {
				$scope.subscription = !$scope.subscription;
				$scope.unsubscription = false;
			} else {
				$scope.subscription = false;
				$scope.unsubscription = !$scope.unsubscription;
			}
		}

		// If custom input for amount, check to see if it's valid
		$document[0].getElementById('other-text-field').addEventListener('focusout', function() {

			var input = $scope.donateObj.amount;

			if(!input) {
				return;
			}

			// If the input is not a number, error out
			if(isNaN(input)) {
				$scope.errorMessage = 'Please enter a valid amount to donate!';
				$scope.error = true;
			}

			// Otherwise, format number so it matches format for btns
			// In order: no cents specified, decimal but no cents, cent is ten but not single (ie: 10.1), more than 2 digits in cent field 
			if(input.indexOf('.') < 0) {
				input = input + '.00';
			} else if (input.indexOf('.') + 1 === input.length) {
				input = input + '00';
			} else if (input.indexOf('.') + 1 === input.length - 1){
				input = input + '0';
			} else if (input.indexOf('.') < input.length + 1){
				input = input.substring(0, input.indexOf('.') + 3);
			}

			$scope.donateObj.amount = input;

			// Since we're doing this in the DOM and not the angular event flow, it needs a separate call here
			return $scope.$apply();
		});

		// Error tracker for our Card Element inputs
		for (var i = 0; i < elementsArray.length; i++) {

			// Again, this is DOM manipulation, so needs angular update statement
			elementsArray[i].addEventListener('change', function(event) {
				if (event.error) {
					$scope.error = true;
					displayError.textContent = event.error.message;
				} else {
					$scope.error = false;
					displayError.textContent = '';
				}
				$scope.$apply();
			});	
		}

		// Get token from Stripe, handle unsubs
		$scope.makeCharge = function(donateForm) {

			// Check if subscribed but email isn't valid
			var emailWorks = donateForm.email.$isEmpty(donateForm.email.$viewValue) !== true && donateForm.email.$valid === true;
			var number = $scope.donateObj.amount;

			if($scope.requesting === true) {
				return;
			}

			$scope.requesting = true;
			
			// check email validity
			if(($scope.subscription === true || $scope.unsubscription === true) && !emailWorks){
				$scope.error = true;
				$scope.requesting = false;
				return $scope.errorMessage = 'Please make sure the email form is complete and correct!';

			// handle unsubs (we only need the email, so we don't need to worry about any of the other stuff)
			} else if($scope.unsubscription === true){
				unsubscribeFunction($scope.donateObj.email);
			// Otherwise, get token and request donation
			} else {

				if(!number || parseInt(number) === NaN) {
					$scope.requesting = false;
					$scope.error = true;
					return $scope.errorMessage = 'Please select a donation amount';
				}

				return stripe.createToken(cardNumber).then(function(result) {
					if(result.error) {
						// Inform the user if there was an error
						$scope.error = true;
						$scope.requesting = false;
						$scope.errorMessage = result.error.message;
					} else {
						requestFromOurServer(result);
					}
				});	

			}
		}


		// Main unsubscription function
		var unsubscribeFunction = function(emailVal) {
			return $http.post('/api/donate', {
				unsubscription: $scope.unsubscription,
				email: emailVal
			}).then(function() {
				$scope.requesting = false;
				$scope.success = true;
				return displaySuccess.textContent = 'Email successfully removed.';

			}, function(error) {
				$scope.error = true;
				$scope.requesting = false;
				$log.error(error);
				$scope.errorMessage = 'There was an error removing your account, please contact <a href="mailto:hello@justfix.nyc" target="_blank">hello@justfix.nyc</a> for help.'
				return $log.error(error);
			});
		};

		// Send to our server, request payment submit
		var requestFromOurServer = function(result) {

			var amt = $scope.donateObj.amount * 100;
			var respondAmt;
			
			// Main body request, we'll handle subscription and email prefs on the server
			return $http.post('/api/donate', {
				data: result.token,
				amt: amt,
				subscription: $scope.subscription,
				email: $scope.donateObj.email,
				name: $scope.donateObj.name
			}).then(function(response){
				$scope.requesting = false;

				// Display success text if everything goes as planned
				if(response.data.status === 'succeeded' || response.data.status === 'active') {
					$scope.error = false;
					$scope.success = true;

					// This needs to be declared b/c it's in two diff locations depending on the donation type (subscribe vs donate)
					if (response.data.amount) {
						respondAmt = (response.data.amount / 100).toFixed(2);
					} else {
						respondAmt = (parseInt(response.data.plan.amount) / 100).toFixed(2);
					}
					displaySuccess.textContent = 'Thank you for your donation of $' + respondAmt + '!';
				} else {
					$scope.error = true;
					displayError.textContent = response.data.message;
				}

			}, function(err) {
				// Err out
				$log.error(err);
				$scope.requesting = false;
				$scope.error = true;
				if(err.data.message){
					$scope.errorMessage = err.data.message;
				} else {
					displayError.textContent = 'There was an issue with the connection, please try again later!';
				}

			});
		};
	}
})();
