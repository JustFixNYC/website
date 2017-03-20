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
			scope.status = {
				isopen: false
			};

			scope.toggleAside = function() {
				angular.element($document[0].querySelector('body')).toggleClass('modal-open');
				angular.element($document[0].getElementById('aside-menu-toggle')).toggleClass('active');
				angular.element($document[0].getElementById('aside-menu')).toggleClass('open');
				angular.element($document[0].getElementById('header-wrap')).toggleClass('blue-active');
			};

			scope.toggleMenuSlidedown = function($event) {

				if($event) {
					$event.preventDefault();
					$event.stopPropagation();
				}


				// Cheating like hell, but I'm not rebuilding .slideDown() for angular.element just b/c jqlite is BS
				if(angular.element($document[0].querySelector('#aside-menu uib-dropdown > span')).hasClass('expanded')) {
					$('.mobile-dropdown-menu').slideUp();
					angular.element($document[0].querySelector('#aside-menu uib-dropdown > span')).removeClass('expanded');
				} else {
					angular.element($document[0].querySelector('#aside-menu uib-dropdown > span')).addClass('expanded');
					$('.mobile-dropdown-menu').slideDown();
				}
			};

		}

		/** @ngInject */
		function NavbarController($rootScope, $document, $scope, $window) {
			var vm = this;

			// on route change success (reset nav position, handle nav css rules)
			var menuToggle = $rootScope.$on("$stateChangeSuccess", function(event, toState) {
				$window.scrollTo(0, 0);

				if(angular.element($document[0].getElementById('aside-menu-toggle')).hasClass('active')) {
					$scope.toggleAside();
				}

				// ONLY CLOSE if not about page and this is already expanded
				if(angular.element($document[0].querySelector('#aside-menu uib-dropdown > span')).hasClass('expanded')){
					$scope.toggleMenuSlidedown();
					$scope.aboutItemActive = false;
				} else {
					$scope.aboutItemActive = false;
				}

				// Nav fix
				if(toState.name === 'home') {
					$scope.headerColor = '';
				} else if(toState.name === 'about.productAndServices') {
					$scope.headerColor = 'blue-bg header-absolute';
				} else {
					$scope.headerColor = 'blue-bg';
				}
			});

			//Dunno why, but calling this as a function inits the destroy function on the listener...
			// menuToggle();

			vm.headerLinks = [
				{
					text: "About Us",
					style: "",
					url: "about",
					children: [
							{
								text: "Products & Services",
								style: "",
								sref: "about.productAndServices"
							},
							{
								text: "Our Partners",
								style: "",
								sref: "about.partners"
							},
							{
								text: "Our Team",
								style: "",
								sref: "about.team"
							},
							{
								text: "Board of Directors",
								style: "",
								sref: "about.directors"
							},
							{
								text: "Press",
								style: "",
								sref: "about.press"
							}
						]
				},
				{
					text: "Mission",
					style: "",
					url: "mission",
					sref: "mission"
				},
				{
					text: "Contact",
					style: "",
					url: "contact",
					sref: "contact"
				},
				// {
				//	 text: "Donate",
				//	 style: "",
				//	 url: "https://www.nycharities.org/give/donate.aspx?cc=4125",
				//	 sref: "",
				//	 target: "_blank"
				// },
				{
					text: "En Español",
					style: "",
					url: "https://beta.justfix.nyc/?lang=es_mx"
				},
				{
					text: "Donate",
					style: "",
					url: "donate",
					sref: "donate"
				},
				{
					text: "Sign In",
					style: "btn",
					url: "https://beta.justfix.nyc/signin",
					sref: ""
				}
			];
		}
	}
})();
