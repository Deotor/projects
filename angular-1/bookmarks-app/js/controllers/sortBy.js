bookmarksApp.controller("sortBy", ['$scope', 'orderByFilter', function($scope, orderBy) {
    //Сортировка встроенным фильтром
    $scope.sortBy = function(propertyName) {
        $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        $scope.list.bookmarks = orderBy($scope.list.bookmarks, $scope.propertyName, $scope.reverse);
    };
}]);