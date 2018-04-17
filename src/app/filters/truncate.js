/**
 * @ngdoc filter
 * @name truncate
 * @kind function
 *
 * @description
 * Truncates a string; optionally breaks at words and adds a tail (e.g. ellipsis)
 * From: https://stackoverflow.com/questions/18095727/limit-the-length-of-a-string-with-angularjs
 *
 * @param {string} value Input to truncate
 * @param {number} max Max length of text in characters
 * @param {boolean} [wordwise=true] Whether to cut text at spaces
 * @param {string} [tail='...'] How to truncate
 * @returns {string} Truncated string.
 */
(function() {
  angular.module('boilerplate').filter('truncate', function () {
    return function (value, max, wordwise, tail) {
      if (!value) return '';

      max = parseInt(max, 10);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      wordwise = wordwise || true;
      if (wordwise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
          //Also remove . and , so its gives a cleaner result.
          if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
            lastspace = lastspace - 1;
          }
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || '...');
    };
  });
})();
