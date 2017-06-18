var slide = $('.slider-sidebar');
var slideMain = $('#slider-sidebar-main');
var sliderMainA = $('.slider-main a');
$('.slider-sidebar:first-child').addClass('slider-sidebar-active');
slide.click(function (event) {
    event.preventDefault();
    if (slide.hasClass('slider-sidebar-active')){
        slide.removeClass('slider-sidebar-active');
    }
    $(this).addClass('slider-sidebar-active');
    sliderMainA.fadeOut(0).slideDown();
    sliderMainA.html($(this).html());
});
var downArrow = $('#down-arrow');
downArrow.hover(
    function() {
        $( this ).addClass( "hover" );
    }, function() {
        $( this ).removeClass( "hover" );
    }
);
downArrow.click(function (event) {
    event.preventDefault();
    var firstChild = $('.slider-sidebar:last-child');
    slideMain.prepend(firstChild);
    console.log(firstChild);
});
var upArrow = $('#up-arrow');
upArrow.hover(
    function() {
        $( this ).addClass( "hover" );
    }, function() {
        $( this ).removeClass( "hover" );
    }
);
upArrow.click(function (event) {
    event.preventDefault();
    var firstChild = $('.slider-sidebar:first-child');
    slideMain.append(firstChild);
    console.log(firstChild);
});