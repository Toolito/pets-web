(function() {

  'use strict';

  angular
    .module('pets.config')
    .run(Bootstrap);



  Bootstrap.$inject = ['$state', '$rootScope'];

  /**
   *
   */
  function Bootstrap($state, $rootScope) {

      $rootScope.$state = $state;

  }

})();
