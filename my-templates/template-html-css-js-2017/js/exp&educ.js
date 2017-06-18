$(document).ready(function() {
    var educ = $('.institution');
    var exp = $('.job');
    educ.mouseenter(function () {
        $(this).find('.institution-name').addClass('institution-active');
        $(this).find('.institution-number').addClass('institution-active');
    });
    educ.mouseleave(function () {
        $(this).find('.institution-name').removeClass('institution-active');
        $(this).find('.institution-number').removeClass('institution-active');
    });
    exp.mouseenter(function () {
        $(this).find('.job-name').addClass('institution-active');
        $(this).find('.job-number').addClass('institution-active');
    });
    exp.mouseleave(function () {
        $(this).find('.job-name').removeClass('institution-active');
        $(this).find('.job-number').removeClass('institution-active');
    });
});