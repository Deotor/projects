var testNERon = angular.module("testNERon", ['LocalStorageModule']);

testNERon.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('testNERon')
});