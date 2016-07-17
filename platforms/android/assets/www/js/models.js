angular.module('app.models', [])
    .service('settings', function() {

        return {radius:20};
    })
    .service('stories', function($filter) {
        var storiesService = {};
        var storiesList = [];

<<<<<<< HEAD
        storiesService.setAll = function(stories) {
            storiesList = stories;
        }

=======
>>>>>>> origin/master
        storiesService.getAll = function() {
            return storiesList;
        }
        storiesService.getItem = function(storyId) {
<<<<<<< HEAD
            return $filter('filter')(storiesList, {_id: storyId})[0];
=======
            return $filter('filter')(storiesList, {id: storyId})[0];
>>>>>>> origin/master
        }
        storiesService.addItem = function(item) {
            storiesList.push(item);
        }
        storiesService.removeItem = function(item) {
            storiesList.splice(storiesList.indexOf(item), 1);
        }
        storiesService.size = function() {
            return storiesList.length;
        }
        return storiesService;
    })
    .service('chapter', function($filter, deepSearch) {
        var chapterService = {};

        chapterService.getAll = function(story) {
            return story.chapters;
        };

        chapterService.getItem = function(story, chapterId) {
            //return deepSearch.find(stories, chapterId);
            //return $filter('filter')(story.chapters, {id: chapterId})[0];
        };

        chapterService.addItem = function(story, chapter) {
            story.chapters.push(chapter);
        }

        chapterService.removeItem = function(story, chapter) {
            story.chapters.splice(story.chapters.indexOf(chapter), 1);
        };

        chapterService.size = function(story) {
            return story.chapters.length;
        };

        return chapterService;
    });