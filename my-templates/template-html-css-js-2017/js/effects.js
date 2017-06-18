$(document).ready(function() {
    var education = $('#education');
    var experience = $('#experience');
    var elements = $('main').children();
    elements.fadeTo(0, 0);
    elements.each(function () {
        if($(window).scrollTop() + $(this).outerHeight() + 20 > $(this).offset().top){
            $(this).fadeTo(2000, 1);

        }
    });
    $(window).scroll(function () {
        elements.each(function () {
            if($(window).scrollTop() + $(this).outerHeight() > $(this).offset().top){
                $(this).fadeTo(2000, 1);
            }
        });
        /*console.log(education.outerHeight());*/
    });
});