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
        templateUrl: 'app/modules/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/modules/about/about.html',
        controller: 'AboutController',
        controllerAs: 'about',
        abstract: true,
        metaTags: {
          title: 'About Us'
        }
      })
      .state('about.partners', {
        url: '/partners',
        templateUrl: 'app/modules/about/partners/partners.html',
        metaTags: {
          title: 'Our Partners'
        }
      })
      .state('about.press', {
        url: '/press',
        templateUrl: 'app/modules/about/press/press.html',
        metaTags: {
          title: 'Press'
        }
      })
      .state('about.productAndServices', {
        url: '/product-and-services',
        templateUrl: 'app/modules/about/product-and-services/product-and-services.html',
        metaTags: {
          title: 'Product And Services'
        }
      })
      .state('about.team', {
        url: '/team',
        templateUrl: 'app/modules/about/team/team.html',
        metaTags: {
          title: 'Our Team'
        }
      })
      .state('mission', {
        url: '/our-mission',
        templateUrl: 'app/modules/mission/mission.html',
        controller: 'MissionController',
        controllerAs: 'mission',
        metaTags: {
          title: 'Our Mission'
        }
      })
      .state('contact', {
        url: '/contact-us',
        templateUrl: 'app/modules/contact/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact',
        metaTags: {
          title: 'Contact Us'
        }
      })
      .state('donate', {
        url: '/donate',
        templateUrl: 'app/modules/donate/donate.html',
        controller: 'DonateController',
        controllerAs: 'donate',
        metaTags: {
          title: 'Donate'
        }
      })
      .state('terms', {
        url: '/terms-of-use',
        templateUrl: 'app/modules/generic-page/generic-page.html',
        metaTags: {
          title: 'Terms of Use'
        },
        controller: function() {
          this.entryID = '26N6wBPKaku0002G48my02';
        },
        controllerAs: 'genericPage'
      })
      .state('privacy', {
        url: '/privacy-policy',
        templateUrl: 'app/modules/generic-page/generic-page.html',
        metaTags: {
          title: 'Privacy Policy'
        },
        controller: function() {
          this.entryID = '2X2INJkBpSe628UEwKma0Q';
        },
        controllerAs: 'genericPage'
      })
      .state('clinic', {
        url: '/get-repairs',
        templateUrl: 'app/modules/clinic/clinic.html',
        controller: 'ClinicController',
        controllerAs: 'clinic',
        resolve: {
          /* @ngInject */
          metaTags: function(contentful) { return contentful.entries('sys.id=4NuCfazi64eCSG0mYEIe6u'); }
        },
        metaTags: {
          /* @ngInject */
          title: function(metaTags) { return metaTags.data.items[0].fields.title; },
          properties: {
            /* @ngInject */
            'og:title': function(metaTags) { return metaTags.data.items[0].fields.title; },
            /* @ngInject */
            'twitter:title': function(metaTags) { return metaTags.data.items[0].fields.title; },
            /* @ngInject */
            'og:description': function(metaTags) { return metaTags.data.items[0].fields.description; },
            /* @ngInject */
            'twitter:description': function(metaTags) { return metaTags.data.items[0].fields.description; },
            /* @ngInject */
            'og:image': function(metaTags) { return 'http:' + metaTags.data.items[0].fields.shareImage.fields.file.url; },
            /* @ngInject */
            'twitter:image': function(metaTags) { return 'http:' + metaTags.data.items[0].fields.shareImage.fields.file.url; }
          }
        }
      });


    // Since we removed the parent About page, we now have to redirect when someone wants to go to '/about'
    $urlRouterProvider.when('/about', '/about/product-and-services');
    $urlRouterProvider.otherwise('/');

  }

})();
