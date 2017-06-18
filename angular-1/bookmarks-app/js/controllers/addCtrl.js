bookmarksApp.controller("addCtrl", ['$scope', function($scope) {

    //добавляем элемент массива
    $scope.addBookmarks = function (name, url, description, addForm) {
        if (addForm.$valid) {
            $scope.list.bookmarks.push({id: getCurrentId(), name: name, url: url, description: description});
        }
    };
    //ID
    function getCurrentId() {
        if (!$scope.list.bookmarks || $scope.list.bookmarks.length == 0) return 1;
        else return $scope.list.bookmarks[$scope.list.bookmarks.length - 1].id+1;
    }
}]);