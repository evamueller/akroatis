angular.module('app.services', ['ionic', 'ngCordova'])
    .factory('geolocationFactory', function($ionicPlatform, $cordovaGeolocation) {
        var positionOptions = {
            timeout: 10000,
            enableHighAccuracy: true
        };

        return {
            getCurrentPosition: function () {
                return $ionicPlatform.ready()
                    .then(function () {
                        return $cordovaGeolocation.getCurrentPosition(positionOptions);
                    });
            }
        }
    })
    .factory('database', function($http) {
        var database = 'http://www.google.de/';
        return {
            getStoriesNearMe: $http.get(database + '').then(
                function onSuccess(response) {
                    return response;
                },
                function onError(error) {
                    return error;
                }
            )
        }
    });