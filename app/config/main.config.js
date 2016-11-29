(function() {

    'use strict';

    angular
        .module('pets.config')
        .constant('_', _)
        .config(Configuration);


    Configuration.$inject = ['$locationProvider', '$modelFactoryProvider', '$mdThemingProvider', '$mdIconProvider', '$provide'];

    /**
     *
     */
    function Configuration($locationProvider, $modelFactoryProvider, $mdThemingProvider, $mdIconProvider, $provide) {

        $mdThemingProvider.theme('default')
            .accentPalette('indigo', {
                'default': '700',
                'hue-1': '300',
                'hue-2': '500',
                'hue-3': '900'
            })
            .primaryPalette('red', {
                'default': '700',
                'hue-1': '300',
                'hue-2': '500',
                'hue-3': '900'
            })
            .backgroundPalette('grey');

        $mdThemingProvider.theme('dark')
            .primaryPalette('grey', {
                'default': '50',
                'hue-1': '100',
                'hue-2': '200',
                'hue-3': '300'
            })
            .accentPalette('red', {
                'default': '700',
                'hue-1': '300',
                'hue-2': '500',
                'hue-3': '900'})
            .dark();

        $mdIconProvider
            .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
            .defaultIconSet('img/icons/sets/core-icons.svg', 24);


        // Remove hashtag navigation
        $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');

        // Force resolve on redirect
        $provide.decorator('$state', function($delegate) {
            var originalTransitionTo = $delegate.transitionTo;
            $delegate.transitionTo = function(to, toParams, options) {
                return originalTransitionTo(to, toParams, angular.extend({
                    reload: true
                }, options));
            };
            return $delegate;
        });

        // Set API URL
        $modelFactoryProvider.defaultOptions.prefix = 'http://localhost:8080';
    }


})();
