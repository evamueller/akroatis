var mongoose = require('mongoose');

var chaptersSchema = mongoose.Schema({
    lat: String,
    long: String,
    name: String,
    audio: String,
    chapterNumber: Number
});

module.exports = mongoose.model('Chapter', chaptersSchema);