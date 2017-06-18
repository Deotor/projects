var express = require('express');
var router = express.Router();
var passport = require('passport');
var async = require('async');
var path = require('path');
var fs = require('fs');
var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var mongoose = require("mongoose");
var User = require('../models/user');
var Room = require('../models/room.js');
mongoose.Promise = global.Promise;

router.get('/signup', function(req, res, next) {
    async.series(
        [
            function (next) {
                getRooms(next);
            }
        ],
        function (error, result) {
            res.render('signup', {user: req.user, rooms: result[0]});
        }
    );
});

function getRooms(callback) {
    Room.find({}, function (err, rooms) {
        if (err) return console.log(err);
        callback(null, rooms)
    });
}

router.post('/signup', multipartMiddleware, function(req, res, next) {

    if(!req.body) return res.sendStatus(400);

    if(req.files.avatar.size !== 0){
        var pathToAvatar = '/img/' + req.body.username + '/' + req.body.username + '.jpg';
        var form = new multiparty.Form({autoFiles: true, uploadDir: path.join('public', 'img', req.body.username)});
        fs.mkdirSync(form.uploadDir);
        fs.renameSync(req.files.avatar.path, path.join(form.uploadDir, req.body.username + '.jpg'));
    }
    else var pathToAvatar = '/img/default_img.jpg';

    User.register(new User({username: req.body.username,
                            password: req.body.password,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            avatar: pathToAvatar}), req.body.password, function(err, account) {

        if (err) {
            console.log(err);
            return res.render('signup', { error: err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
            });
            res.redirect('/');
        });
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;