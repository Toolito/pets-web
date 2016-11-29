(function() {

    'use strict';

    angular.module('pets.routes.pets', [
        'pets.routes.pets.add'
    ]).config(RouteConfigurator);


    RouteConfigurator.$inject = ['$stateProvider'];

    /**
     *
     */
    function RouteConfigurator($stateProvider) {

        var state = {
            name: 'pets',
            url: '/',
            resolve: {
                pets : ['PetModel', function(PetModel) {
                    return PetModel.query();
                }]
            },
            views: {
                'main@': {
                    templateUrl     : '/modules/pets/list/controllers/pets-list.html',
                    controller      : 'PetListController',
                    controllerAs    : 'list'
                }
            },
            ncyBreadcrumb: {
                label: 'Pet list'
            }
        };

        //
        $stateProvider.state(state);

    }

})();
