(function() {
  'use strict';

  angular
    .module('boilerplate')
    .directive('justfixFooter', justfixHeader);

  /** @ngInject */
  function justfixHeader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/justfixFooter/footer.html',
      scope: {
          creationDate: '='
      },
      controllerAs: 'vm',
      controller: footerController,
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function footerController() {
    }
  }

})();
