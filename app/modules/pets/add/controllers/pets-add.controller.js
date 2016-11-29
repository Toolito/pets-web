(function() {

    'use strict';

    angular
        .module('pets.routes.pets.add')
        .controller('PetsAddController', PetsAddController);


    PetsAddController.$inject = ['$state', '$mdToast', 'PetModel'];


    /**
     *
     */
    function PetsAddController($state, $mdToast, PetModel) {

        var self = this;

        var status = ['available', 'not-available'];

        //
        _.extend(self, {
            pet: new PetModel(),
            status: status,

            create: create
        });


        function create() {
            self.pet.$save().then(function() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Pet added!')
                        .position('bottom right')
                        .hideDelay(3000)
                );
                $state.go('pets');
            });
        }

    }

})();
