(function() {
  'use strict';

  angular
    .module('boilerplate')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
