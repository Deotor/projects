testWork.controller("mainCtrl", function($scope, $location, $translate) {
    $scope.user = {
        name: ''
    };
    $scope.hideLogout = true;
    $scope.redirect = function () {
        $scope.user.name = '';
        $scope.hideLogout = true;
        $location.path('/login');
    };
    $scope.changeLng = function( lang ) {
        $translate.use(lang);
    };
    $scope.currentLng = function( lang ) {
        return $translate.use() == lang;
    };
});