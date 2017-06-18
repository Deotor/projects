//добавляем стиль и обработчик события к th c помощью JQlite
bookmarksApp.directive("customDirective", function () {
    return function (scope, element, attributes) {
        var th = element.find('th');
        th.on('mouseover', function () {
            angular.element(this).css("color", "#be0011");
        });
        th.on('mouseout', function () {
            angular.element(this).css("color", "black");
        });
    }
});