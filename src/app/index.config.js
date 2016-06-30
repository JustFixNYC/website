(function() {
  'use strict';

  angular
    .module('boilerplate')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);

    // Set options third-party lib
    // toastrConfig.allowHtml = true;
    // toastrConfig.timeOut = 3000;
    // toastrConfig.positionClass = 'toast-top-right';
    // toastrConfig.preventDuplicates = true;
    // toastrConfig.progressBar = true;
  }

})();
