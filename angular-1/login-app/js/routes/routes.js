testWork.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login_form.html",
            controller: "loginCtrl"
        })
        .state('view_1', {
            url: "/view_1",
            templateUrl: "views/view_1.html",
            controller: "view1Ctrl"
        })
});