(function () {
    "use strict";

    function weatherStatusController($scope, $q, $filter, $state, $window, $rootScope, weatherService) {

        var defaultLocation = {
            city: "Sydney",
            state: "NSW",
            country: "AU"
        };

        $scope.data = {
            location: null,
            searchResult: null
        };

        $scope.uiState = {
            hasResults: false
        };

        function changeUiState(results) {
            var uiState = {
                hasResults: false
            };

            if (results !== null) {
                uiState.hasResults = true;
            } else {
                uiState.hasResults = false;
            }

            return uiState;
        }

        function processSearchResult(data) {
            $scope.uiState = changeUiState(data);

            if (data && data.channel && data.channel.item) {
                //Todo: replace with lodash deep copy
                $scope.data.searchResult = angular.copy(data.channel);
            }
        }

        function search(location) {
            weatherService.getWeather(location)
                .then(function (data) {
                    processSearchResult(data);
                }, function (error) {
                    console.log(error);
                });
        }

        function processUserInput(userInput) {
            var location = {};
            var locationArray = [];

            locationArray = userInput.split(",");

            location.city = locationArray[0];
            location.state = locationArray[1];
            location.country = locationArray[2];

            return location;
        }

        function searchCity(userInput, form) {
            var location = {};
            if (form && form.$valid) {

                location = processUserInput(userInput);
                search(location);
            }
        }

        function clear() {
            $scope.data.location = null;
            search(defaultLocation);
        }

        function init() {
            search(defaultLocation);
        }

        init();

        $scope.searchCity = searchCity;
        $scope.clear = clear;

    }


    angular.module('weatherApp').controller('WeatherStatusController', ['$scope', '$q', "$filter", "$state", "$window", "$rootScope","weatherService", weatherStatusController]);
})();