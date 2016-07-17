var dbauth = require('./database');

var mongoose = require("mongoose");
console.log('mongodb://'+dbauth.user+':'+dbauth.pass+'@'+dbauth.host+':'+dbauth.port+'/'+dbauth.db);
mongoose.connect('mongodb://'+dbauth.user+':'+dbauth.pass+'@'+dbauth.host+':'+dbauth.port+'/'+dbauth.db, {auth:{authdb:"admin"}});

var Story = require('./stories.js');
var Chapter = require('./chapters.js');

var dasHausInDerHeide_first_chapter = new Chapter({
    'lat': '51.494086',
    'long': '7.420317',
    'name': 'Das Haus in der Heide Kapitel 1',
    'audio': 'http://akroatis.cygnus.uberspace.de/adventskalender2014_16_hausheide_elli_128kb.mp3',
    'chapterNumber': 1
});

var dasHausInDerHeide_second_chapter = new Chapter({
    'lat': '51.494307',
    'long': '7.417938',
    'name': 'Das Haus in der Heide Kapitel 2',
    'audio': 'http://akroatis.cygnus.uberspace.de/adventskalender2014_04_derbratapfel_pjw_128kb.mp3',
    'chapterNumber': 2
});

var dasHausInDerHeide = new Story({
    'author': 'Annette von Droste-hülshoff',
    'date': Date.now(),
    'name': 'Das Haus in der Heide',
    'chapters': []
});


var Winternacht_first_chapter = new Chapter({
    'lat': '51.494683',
    'long': '7.419428',
    'name': 'Winternacht Kapitel 1',
    'audio': 'http://akroatis.cygnus.uberspace.de/adventskalender2014_14_winternacht_bl_128kb.mp3',
    'chapterNumber': 1
});

var Winternacht_second_chapter = new Chapter({
    'lat': '51.495658',
    'long': '7.418816',
    'name': 'Winternacht Kapitel 2',
    'audio': 'http://akroatis.cygnus.uberspace.de/adventskalender2014_06_nikolas_nt_128kb.mp3',
    'chapterNumber': 2
});

var Winternacht = new Story({
    'author': 'Gottfried Keller',
    'date': Date.now(),
    'name': 'Winternacht',
    'chapters': []
});


dasHausInDerHeide.chapters.push(dasHausInDerHeide_first_chapter);
dasHausInDerHeide.chapters.push(dasHausInDerHeide_second_chapter);

Winternacht.chapters.push(Winternacht_first_chapter);
Winternacht.chapters.push(Winternacht_second_chapter);

dasHausInDerHeide_first_chapter.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});
dasHausInDerHeide_second_chapter.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});
dasHausInDerHeide.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});


Winternacht_first_chapter.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('wuf');
    }
});
Winternacht_second_chapter.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('wuf');
    }
});
Winternacht.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('wuf');
    }
});
