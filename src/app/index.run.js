(function() {
  'use strict';

  angular
    .module('boilerplate')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $log, contentful) {

    $log.debug('runBlock end');


    // Get all entries for the space (aka site)
    contentful
      .entries()
      .then(

        // Success handler
        function(response){
          $rootScope.content = response.data;
          console.log(response.data);
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );
  }

})();
