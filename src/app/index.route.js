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
        title: 'JustFix.nyc - Technology for Housing Justice',
        templateUrl: 'app/modules/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        globalStyle: 'clear-nav'
      })
      .state('about', {
        url: '/about',
        title: 'About Us | JustFix.nyc',
        templateUrl: 'app/modules/about/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      })
      .state('mission', {
        url: '/our-mission',
        title: 'Our Mission | JustFix.nyc',
        templateUrl: 'app/modules/mission/mission.html',
        controller: 'MissionController',
        controllerAs: 'mission'
      })
      .state('contact', {
        url: '/contact-us',
        title: 'Contact Us | JustFix.nyc',
        templateUrl: 'app/modules/contact/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact'
      })
      .state('clinic', {
        url: '/get-repairs',
        title: 'Get Repairs Made In Your Home | JustFix.nyc',
        templateUrl: 'app/modules/clinic/clinic.html',
        controller: 'ClinicController',
        controllerAs: 'clinic'
      });
      // .state('donate', {
      // 	url: '/donate',
			// 	onEnter: ["$window", function($window) {
			// 		$window.open('https://www.nycharities.org/give/donate.aspx?cc=4125', '_self');
			// 	}]
      // })
      // .state('espanol', {
      //   url: '/espanol',
      //   onEnter: ["$window", function($window) {
      //     $window.open('http://beta.justfix.nyc/espanol', '_self');
      //   }]
      // });

    $urlRouterProvider.otherwise('/');

  }

})();
