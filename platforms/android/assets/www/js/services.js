angular.module('app.services', ['ionic', 'ngCordova', 'app.models'])
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
    .factory('database', function($http, stories) {
        var database = 'http://akroatis.cygnus.uberspace.de/nodejs/stories/';
        return {
            getStoriesNearMe: function(latitude, longitude, distance) {
                return(
                    $http.get(database + latitude + '/' + longitude + '/distance/' + distance).then(
                        function onSuccess(response) {
                            stories.setAll(response.data);
                            return response.data;
                        },
                        function onError(error) {
                            return error;
                        }
                    )
                );
            },

            getAllStories: function(){
                return(
                    $http.get(database + 'all').then(
                        function onSuccess(response) {
                            stories.setAll(response.data);
                            return response.data;
                        },
                        function onError(error) {
                            return error;
                        }
                    )
                );
            }
        }
    });