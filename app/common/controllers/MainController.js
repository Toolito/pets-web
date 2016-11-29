(function() {

    'use strict';

    angular
        .module('pets.common.controllers')
        .controller('MainController', MainController);


    MainController.$inject = ['$mdDialog', '$mdSidenav', 'SidebarService', 'DisplayService'];

    /**
     *
     */
    function MainController($mdDialog, $mdSidenav, SidebarService, DisplayService) {

        var self = this;

        //
        _.extend(self, {
            sidebar         : SidebarService,
            dialog          : $mdDialog,
            display         : DisplayService,
            openMenu        : openMenu

        });


        function openMenu() {
            $mdSidenav('left').toggle();
        }

    }




})();
