angular.module('app.controllers', ['app.services'])
  
.controller('mapCtrl', function($scope, geolocationFactory) {
    geolocationFactory.getCurrentPosition()
        .then(function(position) {
            $scope.geolocation = position.coords;
        }, function(err) {
            console.log('getCurrentPosition error: ' + angular.toJson(err));
        });
})
   
.controller('settingsPageCtrl', function($scope) {

})
         
.controller('signupCtrl', function($scope) {

})
   
.controller('profilCtrl', function($scope) {

})
   
.controller('storiesCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})
 