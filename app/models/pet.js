(function() {

    'use strict';

    angular
        .module('pets.models')
        .factory('PetModel', PetModel);


    PetModel.$inject = ['$modelFactory'];


    /**
     * Model Factory for Pet
     */
    function PetModel($modelFactory) {

        return $modelFactory('pets');

    }

})();
