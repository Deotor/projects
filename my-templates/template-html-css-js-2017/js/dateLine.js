$(document).ready(function() {
    var days = $('.date-line-day');
    var leftArrow = $('.l-arrow');
    var rightArrow = $('.r-arrow');
    var scroll = 0;
    rightArrow.click(function () {
        if(scroll <= 110 * (days.length-7)){
            scroll += 110;
        }
        days.animate({ "right": scroll+'px' });
    });
    leftArrow.click(function () {
        if(scroll > 0){
            scroll -= 110;
        }
        days.animate({ "right": scroll+'px' });
    });
    days.click(function () {
        days.removeClass('date-line-day-active');
        $(this).addClass('date-line-day-active');
    });
});