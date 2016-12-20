(function() {
  'use strict';

  angular
    .module('boilerplate')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider, contentfulProvider, UIRouterMetatagsProvider) {
  // function config($logProvider, $locationProvider, contentfulProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);

    contentfulProvider.setOptions({
        space: 'pinyszn5pxvn',
        accessToken: '7bb67910601e19e0f2aff671ff6b7d0cdafa31c02b36f3c952d5dbd5377dc7e9'
    });

    UIRouterMetatagsProvider
      .setTitleSuffix(' | JustFix.nyc')
      .setDefaultTitle('JustFix.nyc - Technology for Housing Justice')
      .setDefaultDescription('JustFix.nyc adds another tactic to the fight for housing justice by partnering with grassroots organizations to create better support systems for New York City’s excluded communites.')
      .setDefaultKeywords('new york city, new york, brooklyn, bronx, staten island, queens, manhattan, housing, renters, help, know your rights, tenants rights, tenant rights, repairs, landlord, harassment, rent, assistance, legal aid, legal services, legal, legal assistance, technology, directory')
      .setStaticProperties({
              'og:site_name': 'JustFix.nyc - Technology for Housing Justice',
              'og:title': 'JustFix.nyc - Technology for Housing Justice',
              'og:description': 'JustFix.nyc adds another tactic to the fight for housing justice by partnering with grassroots organizations to create better support systems for New York City’s excluded communites.',
              'og:image': 'http://degy28l8twq8c.cloudfront.net/justfixmain.jpg',
              'og:type': 'website',
              'twitter:card': 'summary_large_image',
              'twitter:site': '@JustFixNYC',
              'twitter:creator': '@JustFixNYC',
              'twitter:title': 'JustFix.nyc - Technology for Housing Justice',
              'twitter:description': 'JustFix.nyc adds another tactic to the fight for housing justice by partnering with grassroots organizations to create better support systems for New York City’s excluded communites.',
              'twitter:url': 'http://www.justfix.nyc',
              'twitter:image': 'http://degy28l8twq8c.cloudfront.net/justfixmain.jpg'
          })
      .setOGURL(true);

    // Set options third-party lib
    // toastrConfig.allowHtml = true;
    // toastrConfig.timeOut = 3000;
    // toastrConfig.positionClass = 'toast-top-right';
    // toastrConfig.preventDuplicates = true;
    // toastrConfig.progressBar = true;
  }

})();
