angular.module('app.controllers', ['app.services'])
    .controller('mapCtrl', function($scope, geolocationFactory, $cordovaGeolocation, database) {
        geolocationFactory.getCurrentPosition().then(function(position) {
            $scope.geolocation = position.coords;
            database.getStoriesNearMe(position.coords.latitude, position.coords.longitude, 50000)
                .then(
                    function(stories) {
                        $scope.stories = stories;
                    },
                    function(error) {
                        console.log(error);
                    }
                )
        });
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var myLocation;
        $cordovaGeolocation
            .watchPosition({
                timeout: 10000,
                enableHighAccuracy: false
            })
            .then(null, function(err) {
                // error
            }, function(position) {
                $scope.geolocation = position.coords;
                if (myLocation !== undefined) {
                    myLocation.setMap(null);
                }
                myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    map: map,
                    icon: {
                        url: "img/listening.svg",
                        anchor: new google.maps.Point(25, 50),
                        scaledSize: new google.maps.Size(50, 50)
                    },
                    title: "My Location"
                });
            });
        $scope.storiesMarker = [];
        $scope.storiesInfoWindows = [];
        $cordovaGeolocation
            .getCurrentPosition({
                timeout: 1000,
                enableHighAccuracy: false
            })
            .then(function(position) {
                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                database.getStoriesNearMe(position.coords.latitude, position.coords.longitude, 50000)
                    .then(function(stories) {
                        $scope.stories = stories;
                        $scope.drawStoriesMarker();
                    }, function(error) {
                        console.log(error);
                    });
            }, function(error) {

            });

        map.addListener('zoom_changed', function() {
            $scope.removeStoriesMarker();
            $scope.drawStoriesMarker();
        });

        $scope.drawStoriesMarker = function() {
            for (var i = 0; i < $scope.stories.length; i++) {
                for (var j = 0; j < $scope.stories[i].chapters.length; j++) {
                    addMarker($scope.stories[i], $scope.stories[i].chapters[j]);
                }
            }
        };
        $scope.removeStoriesMarker = function() {
            for (var i = 0; i < $scope.storiesMarker[i].length; i++) {
                $scope.storiesMarker[i].setMap(null);
            }

            $scope.windowCount = 0;
            $scope.storiesInfoWindows = [];
        }

        $scope.windowCount = 0;

        function addMarker(story, chapter) {
            var icon = {
                url: "img/cowboy-hat.svg",
                anchor: new google.maps.Point(25, 50),
                scaledSize: new google.maps.Size(40, 40)
            };
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(chapter.lat, chapter.long),
                map: map,
                icon: icon,
                title: story.name
            });
            $scope.storiesMarker.push(marker);

            var infowindow = new google.maps.InfoWindow({
                content: '<h3>' + story.name + '</h3><p>Kapitel: ' + chapter.chapterNumber + '<br>' + chapter.name + '</p><audio class="nu-audio-stories" controls> <source src = "' + chapter.audio + '" type="audio/mpeg" ></audio>'
            });
            $scope.storiesInfoWindows.push(infowindow);

            google.maps.event.addListener($scope.storiesMarker[$scope.windowCount], 'click', function(innerKey) {
                return function() {
                    $scope.storiesInfoWindows[innerKey].open(map, $scope.storiesMarker[innerKey]);
                }
            }($scope.windowCount));
            $scope.windowCount++;
        }

        $scope.map = map;
        $scope.center = function() {
            map.setCenter(new google.maps.LatLng($scope.geolocation.latitude, $scope.geolocation.longitude));
        }
        $scope.map = map;
    })

.controller('settingsPageCtrl', function($scope, settings) {
    $scope.settings = settings;
})

.controller('signupCtrl', function($scope) {})

.controller('profilCtrl', function($scope) {

})

.controller('storiesCtrl', function($scope, database, stories) {
    database.getAllStories(stories).then(function(data) {
        $scope.stories = data;
    });
})

.controller('storyCtrl', function($scope, $stateParams, stories) {
    $scope.story = stories.getItem($stateParams.storyId);
    console.log($scope.story);
})

.controller('chapterCtrl', function($scope, $stateParams, chapter, stories) {
    $scope.chapter = chapter.getItem(story, $stateParams.chapterId);
})

.controller('loginCtrl', function($scope) {

})
