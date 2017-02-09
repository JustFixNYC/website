"use strict";

angular.module('boilerplate')
	.filter('cc', function() {
		return function(input) {

			// Let's see if this is even necessary
			
			var cardType = '';

			if(input) {
				switch(input[0]) {
					case 3:
						cardType = 'Amex';
						break;
					case 4: 
						cardType = 'Visa';
						break;
					case 5:
						cardType = 'Mastercard';
						break;
					case 6:
						cardType = 'Discover';
				}
				if(cardType === 'Amex') {
					input.substring(0, 4) + input.substring(4, 9) + input.substring(9, input.length);
				} else {
					input.substring(0, 4) + input.substring(4, 8) + input.substring(8, 12) + input.substring(12, input.substring.length);
				}
			}
		};
	});