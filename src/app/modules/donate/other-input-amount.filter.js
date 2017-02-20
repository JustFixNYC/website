"use strict";

angular.module('boilerplate')
	.filter('otherInput', function($timeout) {
		return function(input) {
			
				if(input.indexOf('.') < 0) {
					input = input + '.00';
				}
			// if(input.indexOf('.') < 0) {
			// 	return input = input + '.00';
			// }
		};
	});