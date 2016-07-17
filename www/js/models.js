angular.module('app.models', [])
    .service('settings', function() {

        return {radius:500};
    })
    .service('stories', function($filter) {
        var storiesService = {};
        var storiesList = [];

        storiesService.setAll = function(stories) {
            storiesList = stories;
        }

        storiesService.getAll = function() {
            return storiesList;
        }
        storiesService.getItem = function(storyId) {
            return $filter('filter')(storiesList, {_id: storyId})[0];
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