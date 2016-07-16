angular.module('app.services', ['ionic', 'ngCordova'])

    .factory('BlankFactory', [function(){

    }])

    .factory('geolocationFactory', [function($ionicPlatform, $cordovaGeolocation) {
        var positionOptions = {
            timeout: 10000,
            enableHighAccuracy: true
        };

        return {
            getCurrentPosition: function () {
                return $ionicPlatform.ready()
                    .then(function() {
                        return $cordovaGeolocation.getCurrentPosition(positionOptions);
                    });
            }
        }
    }]);