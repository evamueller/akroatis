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
    .factory('database', function(stories) {
        return {
            getStoriesNearMe: function() {
                var story = {
                    id: 123,
                    name: "Eine Geschichte",
                    description: "Test",
                    author: "Ich",
                    chapters: [
                        {id: 123123123,
                            name: "Chap1",
                            description: "EinTest",
                        audio: 'http://akroatis.cygnus.uberspace.de/bensound-betterdays.mp3'},
                        {id: 2334,
                            name: "Chap1222",
                            description: "EinTest",
                        audio:'http://akroatis.cygnus.uberspace.de/bensound-betterdays.mp3'}
                    ],
                    longitude: 123,
                    latitude: 123
                };
                stories.addItem(story);
                return stories.getAll();
            }
        }
    });