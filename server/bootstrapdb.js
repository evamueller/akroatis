var dbauth = require('./database');

var mongoose = require("mongoose");
console.log('mongodb://'+dbauth.user+':'+dbauth.pass+'@'+dbauth.host+':'+dbauth.port+'/'+dbauth.db);
mongoose.connect('mongodb://'+dbauth.user+':'+dbauth.pass+'@'+dbauth.host+':'+dbauth.port+'/'+dbauth.db, {auth:{authdb:"admin"}});

var Story = require('./stories.js');
var Chapter = require('./chapters.js');

var eva_first_chapter = new Chapter({
    'lat': '51.494086',
    'long': '7.420317',
    'name': 'firstChapter',
    'audio': 'http://akroatis.cygnus.uberspace.de/bensound-betterdays.mp3',
    'chapterNumber': 1
});

var eva_second_chapter = new Chapter({
    'lat': '51.494307',
    'long': '7.417938',
    'name': 'secondChapter',
    'audio': 'http://akroatis.cygnus.uberspace.de/bensound-goinghigher.mp3',
    'chapterNumber': 2
});

var eva_story = new Story({
    'author': 'Eva',
    'date': Date.now(),
    'name': 'akroatis',
    'chapters': []
});


var secondStory_first_chapter = new Chapter({
    'lat': '51.494683',
    'long': '7.419428',
    'name': 'firstChapter',
    'audio': '',
    'chapterNumber': 1
});

var secondStory_second_chapter = new Chapter({
    'lat': '51.495658',
    'long': '7.418816',
    'name': 'firstChapter',
    'audio': '',
    'chapterNumber': 2
});

var second_story = new Story({
    'author': 'Moritz',
    'date': Date.now(),
    'name': 'secondStory',
    'chapters': []
});


eva_story.chapters.push(eva_first_chapter);
eva_story.chapters.push(eva_second_chapter);

second_story.chapters.push(secondStory_first_chapter);
second_story.chapters.push(secondStory_second_chapter);

eva_first_chapter.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});
eva_second_chapter.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});
eva_story.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});


secondStory_first_chapter.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('wuf');
    }
});
secondStory_second_chapter.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('wuf');
    }
});
secondStory.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('wuf');
    }
});