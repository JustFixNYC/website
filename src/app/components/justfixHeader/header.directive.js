(function() {
  'use strict';

  angular
    .module('boilerplate')
    .directive('justfixHeader', justfixHeader);

  /** @ngInject */
  function justfixHeader($document) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/justfixHeader/header.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      link: linkFunc,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function linkFunc(scope, el, attr, vm, $state) {

      scope.toggleAside = function() {
        angular.element($document[0].getElementById('aside-menu-toggle')).toggleClass('active');
        angular.element($document[0].getElementById('aside-menu')).toggleClass('open');
        angular.element($document[0].getElementById('header-wrap')).toggleClass('blue-active');
      };

    }

    /** @ngInject */
    function NavbarController() {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      // vm.relativeDate = moment(vm.creationDate).fromNow();

      vm.headerLinks = [
        {
          text: "Our Mission",
          style: "",
          url: "our-mission"
        },
        {
          text: "About Us",
          style: "",
          url: "about"
        },
        {
          text: "Contact Us",
          style: "",
          url: "contact-us"
        },
        {
          text: "Sign In",
          style: "btn",
          url: "http://beta.justfix.nyc/signin"
        }
      ];
    }
  }

})();
