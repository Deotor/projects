var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var async = require('async');


var mongoose = require("mongoose");
var Room = require('../models/room.js');
mongoose.Promise = global.Promise;


router.get('/', function(req, res, next) {
    if(req.user) {
        async.series(
            [
                function (callback) {
                    getRooms(callback);
                }
            ],
            function (error, result) {
                if (req.user) res.render('index', {title: 'Привет!', user: req.user, rooms: result[0]});
                else res.redirect('/');
            }
        );
    } else res.render('index');
});

function getRooms(callback) {
    Room.find({}, function (err, rooms) {
        if (err) return console.log(err);
        callback(null, rooms)
    });
}

module.exports = router;