var app = angular.module('weatherApp');

app.service('weatherService', function($http, $q){

    var getQuery = function(location) {
        var query = 'select * from weather.forecast where woeid in ' +
                    '(select woeid from geo.places(1) where text="city, state country")';

        query = query.replace('city', location.city)
                     .replace('state', location.state)
                     .replace('country', location.country);
        console.log(query);
        return query;
    };

    var getUrl = function(location){
        var baseUrl = 'https://query.yahooapis.com/v1/public/yql?q=';
        var query = encodeURIComponent(getQuery(location));
        var finalUrl = baseUrl + query;
        return finalUrl;
    };

    this.getWeather = function (location) {
        var url = getUrl(location);
        var params = {
            format: 'json',
            env: 'store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
            callback: 'JSON_CALLBACK'
        };
        var deferred = $q.defer();
        $http({
            method: 'JSONP',
            url: url,
            params: params
        }).success(function(json) {
            console.log(JSON.stringify(json));
            var result = json.query.results;
            deferred.resolve(result);
        }).error(function(error) {
            console.log(JSON.stringify(error));
            deferred.reject(JSON.stringify(error));
        });
        return deferred.promise;
    };

});