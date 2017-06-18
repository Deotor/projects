var cookieSlideNumber = 'slideNumber';
var cookieOptions = {expires: 1};
var slide = $('.slider-sidebar');
var sliderMainA = $('.slider-main a');
var nthNumber = $.cookie(cookieSlideNumber);
if ($.cookie(cookieSlideNumber)){
    var sliderTarget = $('.slider-sidebar:eq(' + nthNumber + ')');
    sliderTarget.addClass('slider-sidebar-active');
    sliderMainA.html(sliderTarget.html());
}
slide.click(function (event) {
    event.preventDefault();
    if (slide.hasClass('slider-sidebar-active')){
        slide.removeClass('slider-sidebar-active');
    }
    $(this).addClass('slider-sidebar-active');
    sliderMainA.fadeOut(0).slideDown();
    sliderMainA.html($(this).html());
    $.cookie(cookieSlideNumber, $(this).index(), cookieOptions);
});
var cookieScrollUp = 'ScrollUp';
var cookieScrollDown = 'ScrollDown';
var downArrow = $('#down-arrow');
var downCount = 0;
var height = $('.slider-sidebar:first-child').height();
var scrollUp = '-=' + height + 'px';
var scrollDown = '+=' + height + 'px';
downArrow.hover(
    function() {
        $( this ).addClass( "hover" );
    }, function() {
        $( this ).removeClass( "hover" );
    }
);
downArrow.click(function (event) {
    event.preventDefault();
    if (downCount < 0){
        downCount += 1;
        upCount -= 1;
        slide.animate({ "top": scrollDown });
        $.cookie(cookieScrollUp, upCount, cookieOptions);
        $.cookie(cookieScrollDown, downCount, cookieOptions);
}});
var upArrow = $('#up-arrow');
var upCount = 0;
upArrow.hover(
    function() {
        $( this ).addClass( "hover" );
    }, function() {
        $( this ).removeClass( "hover" );
    }
);
upArrow.click(function (event) {
    event.preventDefault();
    if (upCount < slide.length-4){
        upCount += 1;
        downCount -= 1;
        slide.animate({ "top": scrollUp });
        $.cookie(cookieScrollDown, downCount, cookieOptions);
        $.cookie(cookieScrollUp, upCount, cookieOptions);
}});
if ($.cookie(cookieScrollUp)){
    var scrollOnLoad = '-=' +  $.cookie(cookieScrollUp) * height + 'px';
    slide.animate({ "top": scrollOnLoad }, 0);
    upCount = parseFloat($.cookie(cookieScrollUp));
    downCount = parseFloat($.cookie(cookieScrollDown));
}