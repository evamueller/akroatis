angular.module('app.controllers', ['app.services'])

<<<<<<< HEAD
    .controller('mapCtrl', function ($scope, geolocationFactory, $cordovaGeolocation, database) {


        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        /*navigator.geolocation.getCurrentPosition(function (pos) {
         map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
         var myLocation = new google.maps.Marker({
         position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
         map: map,
         title: "My Location"
         });
         });*/


        var myLocation;
        $cordovaGeolocation
            .watchPosition({timeout: 10000, enableHighAccuracy: false})
            .then(null,function(err) {
                // error
            }, function (position) {
                if(myLocation !== undefined) {
                    myLocation.setMap(null);
                }
                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    map: map,
                    title: "My Location"
=======
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
                        for (var j = 0; j < $scope.stories[i].chapters.length; j++) {

                            var marker = new google.maps.Marker({
                                position: new google.maps.LatLng($scope.stories[i].chapters[j].lat, $scope.stories[i].chapters[j].long),
                                map: map,
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
>>>>>>> origin/master
                });
        }, function(error) {

        });

    $scope.map = map;
})

<<<<<<< HEAD
    .controller('settingsPageCtrl', function($scope) {
=======
.controller('settingsPageCtrl', function($scope) {
>>>>>>> origin/master

})

<<<<<<< HEAD
    .controller('signupCtrl', function($scope) {
=======
.controller('signupCtrl', function($scope) {
<<<<<<< HEAD
>>>>>>> origin/master

=======
    $scope.map = map;
>>>>>>> origin/master
})

<<<<<<< HEAD
    .controller('profilCtrl', function($scope) {
=======
.controller('profilCtrl', function($scope) {
>>>>>>> origin/master

})

<<<<<<< HEAD
<<<<<<< HEAD
    .controller('storiesCtrl', function($scope,stories, database) {
        $scope.stories = stories.getAll();
    })

    .controller('storyCtrl', function($scope, $stateParams, $sce, stories) {
        $scope.story = stories.getItem($stateParams.storyId);
        $scope.getSafeUrl = function(url) {
            return $sce.trustAsUrl(url);
        }
    })

    .controller('chapterCtrl', function($scope, $stateParams, chapter, stories) {
        $scope.chapter = chapter.getItem(story, $stateParams.chapterId);
    })

    .controller('loginCtrl', function($scope) {
=======
.controller('storiesCtrl', function($scope) {
=======
.controller('storiesCtrl', function($scope, database) {
    $scope.stories = database.getStoriesNearMe();
})

.controller('storyCtrl', function($scope, $stateParams, stories) {
    $scope.story = stories.getItem($stateParams.storyId);
})
>>>>>>> origin/master

.controller('chapterCtrl', function($scope, $stateParams, chapter, stories) {
    $scope.chapter = chapter.getItem(story, $stateParams.chapterId);
})

.controller('loginCtrl', function($scope) {
>>>>>>> origin/master

})
