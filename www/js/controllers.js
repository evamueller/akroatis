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
            if (myLocation !== undefined) {
                myLocation.setMap(null);
            }
            map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
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
            database.getStoriesNearMe(position.coords.latitude, position.coords.longitude, 50000)
                .then(function(stories) {
                    $scope.stories = stories;
                    for (var i = 0; i < $scope.stories.length; i++) {
                        new google.maps.Marker({
                            position: new google.maps.LatLng($scope.stories[i].chapters[0].lat, $scope.stories[i].chapters[0].long),
                            map: map,
                            title: $scope.stories[i].name
                        });
                    }
                }, function(error) {
                    console.log(error);
                });
        }, function(error) {

        });

    $scope.map = map;
})

.controller('settingsPageCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {
    $scope.map = map;
})

.controller('profilCtrl', function($scope) {

})

.controller('storiesCtrl', function($scope, database) {
    $scope.stories = database.getStoriesNearMe();
})

.controller('storyCtrl', function($scope, $stateParams, stories) {
    $scope.story = stories.getItem($stateParams.storyId);
})

.controller('chapterCtrl', function($scope, $stateParams, chapter, stories) {
    $scope.chapter = chapter.getItem(story, $stateParams.chapterId);
})

.controller('loginCtrl', function($scope) {

})
