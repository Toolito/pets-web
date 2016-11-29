(function() {

    'use strict';

    angular
        .module('pets.routes.pets')
        .controller('PetListController', PetListController);


    PetListController.$inject = ['$mdDialog', 'pets'];


    /**
     *
     */
    function PetListController($mdDialog, pets) {

        var self = this;


        //
        _.extend(self, {
            pets: pets,

            remove: remove
        });


        function remove(pet, ev) {

            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Do you want to delete '+pet.name+' ?')
                .textContent('You will no longer be able to cuddle him !')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Yes!')
                .cancel('Oh no!');

            $mdDialog.show(confirm).then(function() {
                pet.$destroy();
            });


        }

    }

})();
