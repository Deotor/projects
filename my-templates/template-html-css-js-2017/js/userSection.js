$(document).ready(function() {
    var menu = $('.menu-a').find('>li>a');
    menu.mouseenter(function () {
        $(this).parent().find('.line-blue').animate({
            width: "100px"
        }, 250 );
    });
    menu.mouseleave(function () {
        $(this).parent().find('.line-blue').animate({
            width: "50px"
        }, 250 );
    });
    menu.each(function() {
        if(!localStorage.getItem('currentTab')){
            localStorage.setItem('currentTab', 'about me');
        }
        if(localStorage.getItem('currentTab') && $(this).html() == localStorage.getItem('currentTab')){
            $(this).addClass('user-section-menu-active');
        }
    });
    menu.click(function () {
        localStorage.setItem('currentTab', $(this).html());
    });
});
