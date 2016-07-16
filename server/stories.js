var mongoose = require('mongoose');
var Chapter = require('./chapters')

var storiesSchema = mongoose.Schema({
    author: String,
    date: { type: Date, default: Date.now },
    name: String,
    chapters: []
});

module.exports = mongoose.model('Story', storiesSchema);