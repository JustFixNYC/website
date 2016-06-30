(function() {
  'use strict';

  angular
    .module('boilerplate')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      })
      .state('mission', {
        url: '/our-mission',
        templateUrl: 'app/mission/mission.html',
        controller: 'MissionController',
        controllerAs: 'mission'
      })
      .state('contact', {
        url: '/contact-us',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
