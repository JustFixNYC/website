(function() {
  'use strict';

  angular
    .module('boilerplate')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $log, contentful, MetaTags) {
  // function runBlock($rootScope, $log, contentful) {

    $log.debug('runBlock end');

    $rootScope.MetaTags = MetaTags;

    // Get all entries for the space (aka site)
    contentful
      .entries()
      .then(
        // Success handler
        function(response){
          $rootScope.content = response.data;
        },

        // Error handler
        function(response){
          $log.error('Oops, error ' + response.status);
        }
      );
  }

})();
