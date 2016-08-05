(function() {
  'use strict';

  angular
    .module('boilerplate')
    .directive('justfixFooter', justfixHeader);

  /** @ngInject */
  function justfixHeader($document) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/justfixFooter/footer.html',
      scope: {
          creationDate: '='
      },
      link: linkFunc,
      controllerAs: 'vm',
      controller: footerController,
      bindToController: true
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {

    }

    /** @ngInject */
    function footerController() {
    }
  }

})();
