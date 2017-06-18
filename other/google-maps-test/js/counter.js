function makeCounter() {
    var currentCount = 1;

    return function() {
        return currentCount++;
    };
}

var counterForLat = makeCounter();
var counterForLng = makeCounter();