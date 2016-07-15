(function() {
  'use strict';

  angular
    .module('boilerplate')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider, contentfulProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);

    contentfulProvider.setOptions({
        space: 'pinyszn5pxvn',
        accessToken: '7bb67910601e19e0f2aff671ff6b7d0cdafa31c02b36f3c952d5dbd5377dc7e9'
    });

    // Set options third-party lib
    // toastrConfig.allowHtml = true;
    // toastrConfig.timeOut = 3000;
    // toastrConfig.positionClass = 'toast-top-right';
    // toastrConfig.preventDuplicates = true;
    // toastrConfig.progressBar = true;
  }

})();
