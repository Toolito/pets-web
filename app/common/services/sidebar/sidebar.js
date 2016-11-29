(function() {
    'use strict';

    angular
        .module('pets.common.services')
        .service('SidebarService', SidebarService);


    SidebarService.$inject = [];


    /**
     * Constructor
     */
    function SidebarService() {

        var self = this;

        /**
         *
         */
        var visible = false;

        /**
         *
         */
        var loginForm = true;

        /**
         *
         */
        var registerForm = false;

        /**
         *
         */
        var userPanel = false;


        //
        _.extend(self, {

            // Public Attributes
            visible             : visible,
            loginForm           : loginForm,
            registerForm        : registerForm,
            userPanel           : userPanel,

            // Public Methods
            toggle              : toggle,
            isShown             : isShown
        });


        function toggle() {

            self.visible = !self.visible;

        }

        function isShown() {
            return self.visible;
        }


    }

})();
