var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var async = require('async');

var mongoose = require("mongoose");
var Room = require('../models/room.js');
var User = require('../models/user.js');
mongoose.Promise = global.Promise;

router.get('/:roomName', function(req, res, next) {
    if(req.user) {
        async.series(
            [
                function (next) {
                    getRooms(next);
                }
            ],
            function (error, result) {
                if (req.user) res.render('rooms', {title: req.params.roomName, user: req.user, rooms: result[0]});
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

router.post('/addroom', jsonParser, function(req, res, next) {

    if(!req.body) return res.sendStatus(400);

    if(req.user){

        var roomToSave = new Room({
            roomName: req.body.roomname
        });

        roomToSave.save()
            .then(function(doc){
            })
            .catch(function (err){
                console.log(err);
            });

        res.redirect('/rooms/' + req.body.roomname);
    }
    else res.redirect('/');
});

router.post('/delroom', jsonParser, function(req, res, next) {

    if(!req.body) return res.sendStatus(400);

    if(req.user){
        Room.deleteOne({roomName: req.body.roomName}, function (err, room) {
            if (err) return console.error(err);
        });
        res.end('');
    }
    else res.redirect('/');
});

router.post('/userInfo', jsonParser, function(req, res, next) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return console.error(err);
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({userName: user.username, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar}));
            res.end('ok');
        } else res.end('ok');
    });

});

module.exports = router;