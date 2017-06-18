module.exports = function(io, user) {
    var mongoose = require("mongoose");
    var Room = require('../models/room');
    mongoose.Promise = global.Promise;
    var async = require('async');

    user.on('connection', function (data) {

        user.join(data.roomName, function (e) {
            //добавляем пользователя в комнату
            var userToSave = {
                username: data.username
            };

            async.series(
                [
                    function (callback) {
                        findRoomAndPushUser(data.roomName, userToSave, callback);
                    },
                    function (callback) {
                        sandUsersList(data.roomName, data.username, callback);
                    },
                    function (callback) {
                        findMsgInRoom(data);
                    }
                ],
                function (error, result) {
                }
            );

        });
        //удаляем юзера из базы
        user.on('disconnect', function () {
            var userToDel = {
                username: data.username
            };

            async.series(
                [
                    function (callback) {
                        findRoomAndDelUser(data.roomName, userToDel, callback);
                    },
                    function (callback) {
                        sandUsersList(data.roomName, data.username, callback);
                    }
                ],
                function (error, result) {
                }
            );
            io.to(data.roomName).emit('systemMsg', {username: data.username, msg: 'покинул чат!'});
        });
    });

    user.on('chat message', function (msg) {

        var msgToSave = {
            id: 0,
            username: msg.username,
            msg: msg.msg
        };
        Room.findOne({roomName: msg.roomName}, function (err, room) {
            if (err) return console.error(err);
            if (room) {
                if(room.msg.length != 0) msgToSave.id = room.msg[room.msg.length - 1].id + 1;
                else msgToSave.id = 1;
                io.to(msg.roomName).emit('chat message', msgToSave);
                room.msg.push(msgToSave);
                room.save(function (err, updatedRoom) {
                    if (err) return console.error(err);
                });
            }
        });
    });

    user.on('del chat msg', function (msg) {

        async.waterfall([
            getRoom,
            mySecondFunction,
            getRoom1
        ], function (err, result) {
            console.log('OK!');
        });
        function getRoom(callback) {
            Room.findOne({roomName: msg.roomName}, function (err, room) {
                if (err) return console.error(err);
                callback(err, room);
            });
        }
        function mySecondFunction(room, callback) {
            if (room) {
                for(var i = 0; i < msg.msgs.length; i++){
                    var msgToDel = {
                        id: msg.msgs[i].id,
                        username: msg.msgs[i].username,
                        msg: msg.msgs[i].msg
                    };
                    room.msg.remove(msgToDel);
                }
                room.save(function (err, updatedRoom) {
                    if (err) return console.error(err);
                    callback(err, 'OK');
                });
            }
        }
        function getRoom1(arg, callback) {
            Room.findOne({roomName: msg.roomName}, function (err, room) {
                if (err) return console.error(err);
                var msgs = [];
                for (var i = 0; i < room.msg.length; i++) {
                    var m = {id: room.msg[i].id, username: room.msg[i].username, msg: room.msg[i].msg};
                    msgs.push(m);
                }
                io.to(msg.roomName).emit('msg history', msgs);
                callback(err, room);
            });
        }
    });

    function findMsgInRoom(data, callback) {
        Room.findOne({roomName: data.roomName}, function (err, room) {
            if (err) return console.log(err);
            var msgs = [];
            for (var i = 0; i < room.msg.length; i++) {
                var msg = {id: room.msg[i].id, username: room.msg[i].username, msg: room.msg[i].msg};
                msgs.push(msg);
            }
            if (msgs.length > 0) {
                user.emit('msg history', msgs);
            }
            io.to(data.roomName).emit('systemMsg', {username: data.username, msg: 'присоединился к чату!'});
        });
    }

    function findRoomAndDelUser(roomName, userToDel, callback) {
        Room.findOne({roomName: roomName}, function (err, room) {
            if (err) return console.error(err);
            if (room) {
                room.username.remove(userToDel);
                room.save(function (err, updatedRoom) {
                    if (err) return console.error(err);
                    callback(null, updatedRoom)
                });
            }
        });
    }

    function findRoomAndPushUser(roomName, userToPush, callback) {
        Room.findOne({roomName: roomName}, function (err, room) {
            if (err) return console.error(err);
            if (room) {
                room.username.push(userToPush);
                room.save(function (err, updatedRoom) {
                    if (err) return console.error(err);
                    callback(null, updatedRoom)
                });
            }
        });
    }

    function sandUsersList(roomName, userName, callback) {
        Room.findOne({roomName: roomName}, function (err, room) {
            if (err) return console.error(err);
            if (room) {
                io.to(roomName).emit('user connected', {usersnames: room.username});
            }
        });
        callback(null, 'Done!')
    }

};

Array.prototype.remove = function (value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1);
    }
    return false;
};