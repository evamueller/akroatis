var express = require('express');
var app = express();

var dbauth = require('./database');

var mongoose = require("mongoose");
console.log('mongodb://'+dbauth.user+':'+dbauth.pass+'@'+dbauth.host+':'+dbauth.port+'/'+dbauth.db);
mongoose.connect('mongodb://'+dbauth.user+':'+dbauth.pass+'@'+dbauth.host+':'+dbauth.port+'/'+dbauth.db, {auth:{authdb:"admin"}});

var Story = require('./stories');
var Chapter = require('./chapters');

app.listen(62123, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/stories/:lat/:long', function(req, res) {
    console.log(req.params);
    Story.find({}, function(error, data){
        var stories = [];
        for(var i = 0; i < data.length; i++) {
            if(getDistanceFromLatLonInM(req.params.lat,req.params.long, data[i].chapters[0].lat, data[i].chapters[0].long) <= 50){
                stories.push(data[i]);
            }
        }
       res.send(stories);
    });
});

app.get('/stories/:lat/:long/distance/:distance', function(req, res) {
    Story.find({}, function(error, data){
        var stories = [];
        for(var i = 0; i < data.length; i++) {
            if(getDistanceFromLatLonInM(req.params.lat,req.params.long, data[i].chapters[0].lat, data[i].chapters[0].long) <= req.params.distance){
                stories.push(data[i]);
            }
        }
        res.send(stories);
    });
});

app.use(express.static(__dirname + '/public'));

function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c * 1000; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}