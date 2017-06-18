testNERon.controller("mainCtrl", function($scope, $http, localStorageService) {
    if(localStorageService.get('tasks')){
        $scope.data = getFromLS('tasks');
        getProjectsForSearch();
    } else {
        seveToLS('tasks', []);
        $scope.data = getFromLS('tasks');
        getProjectsForSearch();
    }

    function seveToLS(name, data) {
        localStorageService.set(name, angular.toJson({tasks: data}));
    }

    function getFromLS(name) {
        return angular.fromJson(localStorageService.get(name));
    }

    function Task(id, title, info, name, priority) {
        this.id = id;
        this.title = title;
        this.info = info;
        this.name = name;
        this.priority = priority;
    }


    $scope.task = new Task(0, "", "", "", "");
    $scope.showAddForm = false;
    $scope.showControls = true;

    $scope.addTask = function (id, title, info, name, priority, addForm) {
        if (addForm.$valid) {
            if(id == 0){
                var task = new Task(getCurrentId(), title, info, name, priority);
                $scope.data.tasks.push(task);
                seveToLS('tasks', $scope.data.tasks);
                $scope.closeAddForm();
                getProjectsForSearch();
            } else{
                for(var key = 0; key < $scope.data.tasks.length; key++){
                    if($scope.data.tasks[key].id == id){
                        $scope.data.tasks[key].title = title;
                        $scope.data.tasks[key].info = info;
                        $scope.data.tasks[key].name = name;
                        $scope.data.tasks[key].priority = priority;
                    }
                }
                seveToLS('tasks', $scope.data.tasks);
                $scope.closeAddForm();
                getProjectsForSearch();
            }
        }
    };

    $scope.delTask = function (id) {
        for(var key = 0; key < $scope.data.tasks.length; key++){
            if($scope.data.tasks[key].id == id){
                var idToDel = parseFloat(key);
            }
        }
        $scope.data.tasks.splice(idToDel, 1);
        seveToLS('tasks', $scope.data.tasks);
        $scope.closeAddForm();
        getProjectsForSearch();
    };

    $scope.changeTask = function (id, title, info, name, priority) {
        $scope.openAddForm();
        writeAddForm(id, title, info, name, priority);
    };

    $scope.openAddForm = function () {
        clearAddForm();
        $scope.showAddForm = true;
        $scope.showControls = false;
    };

    $scope.closeAddForm = function () {
        $scope.showAddForm = false;
        $scope.showControls = true;
    };

    function getCurrentId() {
        if (!$scope.data.tasks || $scope.data.tasks.length == 0) return 1;
        else return $scope.data.tasks[$scope.data.tasks.length - 1].id + 1;
    }

    function clearAddForm() {
        $scope.task.id = 0;
        $scope.task.title = "";
        $scope.task.info = "";
        $scope.task.name = "";
        $scope.task.priority = "";
    }

    function writeAddForm(id, title, info, name, priority) {
        $scope.task.id = id;
        $scope.task.title = title;
        $scope.task.info = info;
        $scope.task.name = name;
        $scope.task.priority = priority;
    }


    function getProjectsForSearch() {
        $scope.data.searchedProjects = [];
        var match = 0;
        for(var key = 0; key < $scope.data.tasks.length; key++){
            if($scope.data.searchedProjects.length > 0){
                for(var i = 0; i < $scope.data.searchedProjects.length; i++){
                    if($scope.data.searchedProjects[i].searchedProject == $scope.data.tasks[key].name){
                        match = 1;
                    }
                }
            }
            if(match == 0){
                $scope.data.searchedProjects.push({searchedProject: $scope.data.tasks[key].name});
            } else match = 0;
        }
    }

    $scope.orderBy = function(prop) {
        if($scope.orderByPriority == 'priority') $scope.orderByPriority = "";
        else $scope.orderByPriority = prop;
    }
});