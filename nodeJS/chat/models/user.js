var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userScheme = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10
    },
    avatar: {
        type: String,
        default: '/img/default_img.jpg'
    }

});

userScheme.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userScheme);