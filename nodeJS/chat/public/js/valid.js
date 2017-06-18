$('#add-room-form').validate({
    rules: {
        roomname: {
            regx: /[0-9A-Za-zА-Яа-я]$/,
            minlength: 1,
            maxlength: 7
        }
    }
});

$.validator.addMethod("regx", function(value, element, regexpr) {
    return regexpr.test(value);
}, "Допускаются строчные и заглавные буквы и цифры, длина от 1 до 7 символа!");

$('#signup-form').validate({
    rules: {
        username: {
            regx: /[0-9A-Za-zА-Яа-я]$/,
            minlength: 1,
            maxlength: 10
        },
        firstName: {
            regx: /[0-9A-Za-zА-Яа-я]$/,
            minlength: 1,
            maxlength: 10
        },
        lastName: {
            regx: /[0-9A-Za-zА-Яа-я]$/,
            minlength: 1,
            maxlength: 10
        }
    }
});