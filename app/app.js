(function() {
    'use strict';

    angular.module('weatherApp', [
        'ui.router'
    ])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/weatherStatus");

            $stateProvider
                .state('weatherStatus', {
                    url: '/weatherStatus',
                    templateUrl: 'weatherStatus/weatherStatus.html',
                    controller: 'WeatherStatusController'
                });

        });
})();