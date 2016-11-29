(function() {

    'use strict';


    /**
     *
     */
    angular
        .module('pets', [

            // Angular modules

            // Third party modules
            'ngMaterial',
            'ngMessages',
            'ui.router',
            'ct.ui.router.extras',
            'ui.event',
            'ncy-angular-breadcrumb',
            'ui.keypress',
            'ui.map',
            'modelFactory',
            "ngSanitize",

             // Core area
            'pets.config',
            'pets.common',

            // Features area
            'pets.routes'
        ]);

})();
