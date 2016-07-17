angular.module('app.controllers', ['app.services'])

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
                });
            });

        $scope.map = map;
    })

    .controller('settingsPageCtrl', function($scope) {

    })

    .controller('signupCtrl', function($scope) {

    })

    .controller('profilCtrl', function($scope) {

    })

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

    })
 