var io = io();
var chatForm = $('#chat-form');
var msg = $('#input-msg');
var chat = $('#chat, html');
var chatUl = $('#chatUl');
var wrapper1 = $('.wrapper-1-1');
var usersUl = $('#usersUl');
var delRoomBtn = $('.del-room-yes');
var delMsgBtn = $('.del-msg');

delRoomBtn.click(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "delroom",
        data: "roomName=" + roomName,
        success: function(){
            window.location = "/";
        }
    });
});

wrapper1.css('height', $(window).height() - 300 + 'px');
$(window).resize(function() {
    wrapper1.css('height', $(window).height() - 300 + 'px');
});

chatForm.submit(function (e) {
    e.preventDefault();
    if(msg.val() === ''){
        return
    }
    io.emit('chat message', {msg: msg.val(), username: username, roomName: roomName});
    msg.val('');
});

io.on('connect', function(){
    io.emit('connection', {roomName: roomName, username: username});
});

io.on('systemMsg', function(msg){
    chatUl.append($('<li class="list-group-item list-group-item-info">').html('<span class="user-name-chat">' + msg.username + '</span>' + ' ' + msg.msg));
    chat.scrollTop(Math.pow(10, 10));
});

io.on('user connected', function(users){
    if(users.usersnames.length > 0){
        var list = '';
        usersUl.html('');
        var prev = '';
        for(var i = 0; i < users.usersnames.length; i++){
            if(prev != users.usersnames[i].username){
                var userEl = $('<div/>', {
                    class: 'dropdown'
                }).appendTo(usersUl);
                $('<li/>', {
                    class: 'list-group-item',
                    role: "button",
                    html: ('<span class="user-name-chat">' + users.usersnames[i].username + '</span> <span class="caret"></span>')
                }).attr("data-toggle", "dropdown").appendTo(userEl);
                var ulDropDown = $('<ul/>', {
                    class: 'dropdown-menu',
                    html: ('<li data-toggle="modal" data-target="#user-info"><a username="' + users.usersnames[i].username + '" href="">Info</a></li>')
                }).appendTo(userEl);

                ulDropDown.find('a').click(function (e) {
                    e.preventDefault();
                    $.ajax({
                        method: "POST",
                        url: "/rooms/userInfo",
                        data: { username: $(this).attr('username')}
                    })
                        .done(function(user) {
                            var modal = $('#user-info');
                            modal.find('.modal-title').text(user.userName + ' info');
                            modal.find('img').css('float', 'left').attr('src', user.avatar);
                            modal.find('.first-name').text(user.firstName);
                            modal.find('.last-name').text(user.lastName);
                        });
                });

                prev = users.usersnames[i].username;
            }
        }
        chat.scrollTop(Math.pow(10, 10));
    }
});

io.on('chat message', function(msgs){
        chatUl.append($('<li class="list-group-item msg"  id="' + msgs.id + '">').html('<span class="user-name-chat">' + msgs.username + '</span></br>' + '<span class="sp-msg">' + msgs.msg + '</span>' + '<span class="check-del"><input type="checkbox"></span>'));
        chat.scrollTop(Math.pow(10, 10));
    delMsg()
});

io.on('msg history', function(msgs){
        chatUl.find('.msg').remove();
        for(var i = 0; i < msgs.length; i++){
            chatUl.append($('<li class="list-group-item msg" id="' + msgs[i].id + '">').html('<span class="user-name-chat">' + msgs[i].username  + '</span></br>' + '<span class="sp-msg">' + msgs[i].msg + '</span>' + '<span class="check-del"><input type="checkbox"></span>'));
        }
        chat.scrollTop(Math.pow(10, 10));
    delMsg()
});

function delMsg() {
    var btnDelMsg = $('.del-msg');
    btnDelMsg.css('visibility', 'hidden');
    $('.msg').off('click').click(function () {

        var checkboxAll = chatUl.children('.msg').find(':checkbox');
        var checkbox = $(this).find(':checkbox');
        checkbox.click(function (e) {
            e.preventDefault();
        });
        if(!checkbox.attr('checked')){
            checkbox.attr('checked', true);
            $(this).find('.check-del').css('visibility', 'visible');
        } else{
            checkbox.removeAttr("checked");
            $(this).find('.check-del').css('visibility', 'hidden');
        }
        checkboxAll.each(function () {
            if($(this).prop('checked') === true){
                btnDelMsg.css('visibility', 'visible');
                return false;
            } else btnDelMsg.css('visibility', 'hidden');
        });
    });

    delMsgBtn.off('click').click(function (e) {
        e.preventDefault();
        var arrMsgId = [];
        var checkboxAll = chatUl.children('.msg').find(':checkbox');
        checkboxAll.each(function () {
            if($(this).prop('checked') === true){
                var msg = {id: parseFloat($(this).parent().parent().attr('id')), username: $(this).parent().parent().children('.user-name-chat').text(), msg: $(this).parent().parent().children('.sp-msg').text()};
                arrMsgId.push(msg);
            }
        });
        io.emit('del chat msg', {msgs: arrMsgId, roomName: roomName});
    });
}

Array.prototype.remove = function (value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1);
    }
    return false;
};