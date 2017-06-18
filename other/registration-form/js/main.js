var step1 = $('#step1');
var step2 = $('#step2');
var step3 = $('#step3');
var step4 = $('#step4');
var next = $('#next');
var finish = $('#finish');
var nav = $('menu li');
$(nav[0]).addClass('active active-color');

step2.fadeOut(0);
step3.fadeOut(0);
step4.fadeOut(0);
finish.fadeOut(0);

var numberOfStep = 1;
localStorage.setItem('numberOfStep', numberOfStep);

//ЛИСТАЕМ СТРАНИЦЫ
next.on('click', function () {
    var numberOfStep = localStorage.getItem('numberOfStep');
    switch (numberOfStep){
        case '1':
            var first = $('#step1 .form-control');
            if(!first.hasClass('error')){
                step1.fadeOut(0).delay(1000);
                step2.fadeIn(0);
                writeTooLocalStorage('numberOfStep', parseFloat(numberOfStep)+1);
                $(nav[1]).addClass('active active-color');
                $(nav[0]).removeClass('active active-color');
                first.each(function () {
                    writeTooLocalStorage($(this).attr('id'), $(this).val());
                });
                $(this).tooltip("hide");
            }
            else {
                $(this).tooltip({title: "Заполните необходимые поля", placement: "right", trigger: "manual"});
                $(this).tooltip("show");
            }
            break;
        case '2':
            var second = $('#step2 .form-control');
            if(!second.hasClass('error')) {
                step2.fadeOut(0);
                step3.fadeIn(0);
                writeTooLocalStorage('numberOfStep', parseFloat(numberOfStep) + 1);
                $(nav[2]).addClass('active active-color');
                $(nav[1]).removeClass('active active-color');
                second.each(function () {
                    writeTooLocalStorage($(this).attr('id'), $(this).val());
                });
                $(this).tooltip("hide");
            }
            else {
                    $(this).tooltip({title: "Заполните необходимые поля", placement: "right", trigger: "manual"});
                    $(this).tooltip("show");
            }
            break;
        case '3':
            var third = $('#step3 .form-control');
            if(!third.hasClass('error')) {
                step3.fadeOut(0);
                step4.fadeIn(0);
                $('#next').fadeOut(0);
                $('#finish').fadeIn(0);
                result();
                $(nav[3]).addClass('active active-color');
                $(nav[2]).removeClass('active active-color');
                third.each(function () {
                    writeTooLocalStorage($(this).attr('id'), $(this).val());
                });
                $(this).tooltip("hide");
            }
            else {
                $(this).tooltip({title: "Заполните необходимые поля", placement: "right", trigger: "manual"});
                $(this).tooltip("show");
            }
            break;
    }
});
//ВАЛИДАЦИЯ
    $('#login, #password, #re-password, #phone, #cardNumber').blur( function() {
        var id = $(this).attr('id');
        var val = $(this).val();
        switch (id){
            case 'login':
                var rvName = /^[a-zA-Z][a-zA-Z0-9-_\.]/;
                if(val.length >= 8  && val != '' && rvName.test(val)){
                    $(this).tooltip('hide');
                    $(this).removeClass('error error-border');
                }
                else{
                    $(this).tooltip({title: "Логин должен начинаться с буквы и иметь длину не менее 8 символов", placement: "right", trigger: "manual"});
                    $(this).tooltip("show");
                    $(this).addClass('error error-border');
                }
                break;
            case 'password':
                var rvPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
                if(val.length >= 8 && rvPassword.test(val)){
                    $(this).tooltip('hide');
                    $(this).removeClass('error error-border');
                }
                else{
                    $(this).tooltip({title: "Должен содержать большую, маленькую букву, цыфру и иметь длину не менее 8 символов", placement: "right", trigger: "manual"});
                    $(this).tooltip("show");
                    $(this).addClass('error error-border');
                }
                break;
            case 're-password':
                if($('#re-password').val() == $('#password').val()){
                    $(this).tooltip('hide');
                    $(this).removeClass('error error-border');
                }
                else{
                    $(this).tooltip({title: "Пароли не совпадают", placement: "right", trigger: "manual"});
                    $(this).tooltip("show");
                    $(this).addClass('error error-border');
                }
                break;
            case 'cardNumber':
                var rvCardNamber = /[0-9]{16}$/;
                if(rvCardNamber.test(val)){
                    $(this).tooltip('hide');
                    $(this).removeClass('error error-border');
                }
                else{
                    $(this).tooltip({title: "Длина равна 16 символам", placement: "right", trigger: "manual"});
                    $(this).tooltip("show");
                    $(this).addClass('error error-border');
                }
                break;
            case 'phone':
                var rvPhone = /[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}/;
                if(rvPhone.test(val)){
                    $(this).tooltip('hide');
                    $(this).removeClass('error error-border');
                }
                else{
                    $(this).tooltip({title: "Введите в международном формате", placement: "right", trigger: "manual"});
                    $(this).tooltip("show");
                    $(this).addClass('error error-border');
                }
                break;
        }
    });
//ФОРМИРОВАНИЕ ПОСЛЕДНЕЙ СТРАНИЦЫ
function result() {
    var right = $('#right');
    var input = $('.form-control:not(#re-password, #csv, #expMonth, #expYear)');
    input.each(function () {
            if($(this).val() != ''){
            $(right).append('<p>' + $(this).val() + '' + '</p>');
            }
            else{
                $(right).append('<p>' + 'не введено!' + '</p>');
            }
    });
var expDate = $('#expMonth').val() + '/' + $('#expYear').val();
right.append('<p>' + expDate + '</p>');
}
//Отправляем данные
finish.on('click', function () {
    if($('#read').prop("checked")){
        AjaxPOST();
    }
});
//ФУНКЦИЯ ЗАПИСИ В LocalStorage
function writeTooLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
//Формируем POST запрос для Ajax
function AjaxPOST() {
    var str = step1.serialize() + step2.serialize() + step3.serialize();
    $.cookie('Ajax', str);
}