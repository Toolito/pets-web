(function() {
    'use strict';

    angular
        .module('pets.common.services')
        .service('DisplayService', DisplayService);


    DisplayService.$inject = [];


    /**
     * Constructor
     */
    function DisplayService() {

        var self = this;



        //
        _.extend(self, {

            // Public Attributes

            // Public Methods
            dialog              : dialog
        });


        function dialog(id) {

           // LxDialogService.open(id);

        }


    }

})();
