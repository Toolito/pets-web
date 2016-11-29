(function() {

    'use strict';

    angular.module('pets.routes.pets.add', []).config(RouteConfigurator);


    RouteConfigurator.$inject = ['$stateProvider'];

    /**
     *
     */
    function RouteConfigurator($stateProvider) {

        var state = {
            name: 'pets.add',
            url: 'pets/add',
            resolve: {},
            views: {
                'main@': {
                    templateUrl     : '/modules/pets/add/controllers/pets-add.html',
                    controller      : 'PetsAddController',
                    controllerAs    : 'add'
                }
            },
            ncyBreadcrumb: {
                label: 'Add a pet'
            }
        };

        //
        $stateProvider.state(state);

    }

})();
