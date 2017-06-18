bookmarksApp.controller("mainCtrl", function($scope, $http) {

    //http запрос
    $http.get("bookmarks.json").success(function (data) {
        $scope.list = data;
    });

    //стиль
    $scope.myStyle={'vertical-align': 'middle'};

    //ngInclude
    $scope.inputForm = {name: 'inputForm', url: 'views/inputForm.html'};
    $scope.outputForm = {name: 'outputForm', url: 'views/outputForm.html'};
});