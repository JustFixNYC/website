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
      controllerAs: 'vm',
      controller: NavbarController,
      link: linkFunc,
      bindToController: true
    };

    return directive;

    function linkFunc(scope) {

      scope.toggleAside = function() {
        angular.element($document[0].getElementById('aside-menu-toggle')).toggleClass('active');
        angular.element($document[0].getElementById('aside-menu')).toggleClass('open');
        angular.element($document[0].getElementById('header-wrap')).toggleClass('blue-active');
      };

    }

    /** @ngInject */
    function NavbarController($rootScope, $document, $scope, $window) {
			var vm = this;

			// Set pg to top on routechange
			var menuToggle = $rootScope.$on("$stateChangeSuccess", function(event, toState) {
				$window.scrollTo(0, 0);

				if(angular.element($document[0].getElementById('aside-menu-toggle')).hasClass('active')) {
					$scope.toggleAside();
				}

				// Nav fix
				if(toState.name !== 'home') {
					$scope.headerColor = 'blue-bg';
				} else {
					$scope.headerColor = '';
				}
			});

			menuToggle();

			// "vm.creationDate" is available by directive option "bindToController: true"
			// vm.relativeDate = moment(vm.creationDate).fromNow();

			vm.headerLinks = [
				{
					text: "Our Mission",
					style: "",
					url: "mission",
					sref: "mission"
				},
				{
					text: "About Us",
					style: "",
					url: "about",
					sref: "about",
					children: {
						text: "About Us",
						style: "",
						url: "about",
						sref: "about"
					}
				},
				{
					text: "Contact Us",
					style: "",
					url: "contact",
					sref: "contact"
				},
        // {
        //   text: "Donate",
        //   style: "",
        //   url: "https://www.nycharities.org/give/donate.aspx?cc=4125",
        //   sref: "",
        //   target: "_blank"
        // },
        {
          text: "En Español",
          style: "",
          url: "http://beta.justfix.nyc/?lang=es_mx"
        },
        {
          text: "Sign In",
          style: "btn",
          url: "http://beta.justfix.nyc/signin",
          sref: ""
        }
      ];
    }
  }

})();
