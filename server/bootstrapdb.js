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

eva_story.chapters.push(eva_first_chapter);
eva_story.chapters.push(eva_second_chapter);

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