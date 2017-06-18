$(document).ready(function() {
    var menu = $('aside');
    var marginTop = $(window).scrollTop() + 30 + 'px';
    menu.animate({
        marginTop: marginTop
    },30);
    $(window).scroll(function () {
        var marginTop = $(window).scrollTop() + 30 + 'px';
        menu.animate({
            marginTop: marginTop
        },30);
    });
});