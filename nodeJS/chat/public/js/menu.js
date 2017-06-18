var rooms = $('.rooms>li');

rooms.each(function () {
    var url = decodeURI(location.href);
    if(url.indexOf($(this).children('a').attr('href')) + 1) $(this).addClass('active');
    else $(this).removeClass('active');
});