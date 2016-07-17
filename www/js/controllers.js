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
                    title: "My Location"
                });
            });

        $cordovaGeolocation
            .getCurrentPosition({
                timeout: 1000,
                enableHighAccuracy: false
            })
            .then(function(position) {
                map.setCenter(new google.maps.LatLng($scope.geolocation.latitude, $scope.geolocation.longitude));
                database.getStoriesNearMe(position.coords.latitude, position.coords.longitude, 50000)
                    .then(function(stories) {
                        $scope.stories = stories;
                        for (var i = 0; i < $scope.stories.length; i++) {
                            for (var j = 0; j < $scope.stories[i].chapters.length; j++) {

                              var icon = {
                                url: "img/cowboy-hat.svg",
                                anchor: new google.maps.Point(25,50),
                                scaledSize: new google.maps.Size(50,50)
                              };
                                var marker = new google.maps.Marker({
                                    position: new google.maps.LatLng($scope.stories[i].chapters[j].lat, $scope.stories[i].chapters[j].long),
                                    map: map,
                                    icon:icon,
                                    title: $scope.stories[i].name
                                });

                                var infowindow = new google.maps.InfoWindow({
                                    content: '<h3>' + $scope.stories[i].name + '</h3><p>Kapitel: ' + $scope.stories[i].chapters[j].chapterNumber + '<br>' + $scope.stories[i].chapters[j].name + '</p><audio class="audio-stories" controls> <source src = "' + $scope.stories[i].chapters[j].audio + '" type="audio/mpeg" ></audio>'
                                });

                                marker.addListener('click', function() {
                                    infowindow.open(map, marker);
                                });
                            }
                        }
                    }, function(error) {
                        console.log(error);
                    });
            }, function(error) {

            });

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

.controller('storiesCtrl', function($scope, database) {
    database.getAllStories().then(function(data) {
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
