angular.module('app.routes', [])

    .config(function($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider
          .state('tabsController.map', {
            url: '/map',
            views: {
              'tab1': {
                templateUrl: 'templates/map.html',
                controller: 'mapCtrl'
              }
            }
          })

          .state('settingsPage', {
            url: '/settings',
            templateUrl: 'templates/settingsPage.html',
            controller: 'settingsPageCtrl'
          })

          .state('tabsController', {
            url: '/tabs',
            templateUrl: 'templates/tabsController.html',
            abstract:true
          })

          .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
          })

          .state('profil', {
            url: '/profile',
            templateUrl: 'templates/profil.html',
            controller: 'profilCtrl'
          })

          .state('tabsController.stories', {
            url: '/stories',
            views: {
              'tab3': {
                templateUrl: 'templates/stories.html',
                controller: 'storiesCtrl'
              }
            }
          })

          .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          })

          .state('tabsController.story', {
            url: '/story/{storyId}',
            views: {
              'tab3': {
                templateUrl: 'templates/story.html',
                controller: 'storyCtrl'
              }
            }
          })


      $urlRouterProvider.otherwise('/tabs/map')



    });