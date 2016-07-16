angular.module('app.controllers', ['app.services'])

    .controller('mapCtrl', function($scope, geolocationFactory) {
        geolocationFactory.getCurrentPosition().then(function(position) {
            $scope.geolocation = position.coords;
        });
    })

    .controller('settingsPageCtrl', function($scope, settings) {
        $scope.settings = settings;
    })

    .controller('signupCtrl', function($scope) {

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
 