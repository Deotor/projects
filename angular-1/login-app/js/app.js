var testWork = angular.module("testWork", ["ui.router", "pascalprecht.translate"]);

testWork.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        LOGIN: 'Login',
        LOGOUT: 'LogOut',
        PASS: 'Password',
        ENTER: 'Log In',
        GREET: 'Hello'
    });
    // Русский
    $translateProvider.translations('ru', {
        LOGIN: 'Логин',
        LOGOUT: 'Выйти',
        PASS: 'Пароль',
        ENTER: 'Войти',
        GREET: 'Привет'
    });
    $translateProvider.preferredLanguage('ru');
    $translateProvider.useSanitizeValueStrategy('escape');
}]);