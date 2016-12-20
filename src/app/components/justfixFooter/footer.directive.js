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
      controller: footerController,
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function footerController() {
    }
  }

})();
