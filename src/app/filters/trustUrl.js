/**
 * @ngdoc filter
 * @name trustUrl
 * @kind function
 *
 * @description
 * Trust a resource URL without having to run $sce in each individual controller
 *
 * @param {string} url URL to trust
 * @returns {string} Trusted URL
 */
(function() {
  angular.module('boilerplate').filter('trustUrl', function ($sce) {
      return function(url) {
        return $sce.trustAsResourceUrl(url);
      };
  });
})();
