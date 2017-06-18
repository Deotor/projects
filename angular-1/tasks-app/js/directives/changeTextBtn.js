testNERon.directive("customDirective", function () {
    return function (scope, element, attributes) {
        element.on('click', function () {
            if(angular.element(this).html() == "Open info") angular.element(this).html("Close info");
            else angular.element(this).html("Open info");
        });
    }
});