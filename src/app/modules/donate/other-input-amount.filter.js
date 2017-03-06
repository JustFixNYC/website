"use strict";

angular.module('boilerplate')
	.filter('otherInput', function() {
		return function(input) {

			if(input.indexOf('.') < 0) {
				input = input + '.00';
			} else if (input.indexOf('.') > input.length + 1){
				return input = input.substring(0, input.indexOf('.') + 1);
			}
			// if(input.indexOf('.') < 0) {
			// 	return input = input + '.00';
			// }
		};
	});