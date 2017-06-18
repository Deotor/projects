testWork.controller("loginCtrl", function($scope, $location) {
    $scope.submit = function() {
        $scope.$parent.user.name = $scope.login;
        $location.path('/view_1');
    }
});