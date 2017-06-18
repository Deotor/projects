var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');

var jsonParser = bodyParser.json();

/*router.get('/signin', function(req, res, next) {
    res.render('signin');
});

router.post('/signin', jsonParser, function(req, res, next) {

    if(!req.body) return res.sendStatus(400);
});*/

router.get('/signin', function (req, res, next) {
    res.render('signin'/*, { user: req.user, message: req.flash('error') }*/);
});

router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true}), function(req, res, next) {
    res.redirect('/');
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;