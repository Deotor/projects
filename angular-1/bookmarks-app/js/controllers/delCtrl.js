bookmarksApp.controller("delCtrl", ['$scope', 'orderByFilter', function($scope, orderBy) {

    //удаляем элемент массива
    $scope.deleteBookmarks = function (id) {
        for(var key = 0; key < $scope.list.bookmarks.length; key++){
            if($scope.list.bookmarks[key].id == id){
                var idDel = parseFloat(key);
            }
        }
        $scope.list.bookmarks.splice(idDel, 1);
    };
}]);