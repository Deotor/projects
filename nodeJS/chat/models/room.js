var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var room = new Schema({
    roomName: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 7
    },
    username: {
        type: Array
    },
    msg: {
        type: Array
    }
});

module.exports = mongoose.model('Room', room);