//custom фильтр
bookmarksApp.filter('customFilter', function() {
    return function(string) {
        return string + ' :-)';
    }
});