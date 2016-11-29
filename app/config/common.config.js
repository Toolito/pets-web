(function () {

    'use strict';

    angular.module('pets.config', []);

    angular.module('pets.common.controllers', []);
    angular.module('pets.common.directives', []);
    angular.module('pets.common.services', []);
    angular.module('pets.common.factories', []);

    angular.module('pets.models', []);
    angular.module('pets.common', [
        'pets.common.controllers',
        'pets.common.directives',
        'pets.common.factories',
        'pets.common.services',

        'pets.models'
    ]);

})();
