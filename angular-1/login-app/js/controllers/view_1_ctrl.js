testWork.controller("view1Ctrl", function($scope, $location) {
        if($scope.$parent.user.name == ''){
            $location.path('/login');
        }
    $scope.$parent.hideLogout = false;
});