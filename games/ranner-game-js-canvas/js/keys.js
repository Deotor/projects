var keys = {
    'UP': 38,
    'DOWN': 40,
    'RIGHT': 39,
    'LEFT': 37,
    'ENTER': 13,
    'SPACE': 32,
    time: 0
};

var keyDown = {
    13: false,
    32: false,
    37: false,
    38: false,
    39: false,
    40: false
};

var setKey = function (keyCode) {
    keyDown[keyCode] = true;
};

var clearKey = function (keyCode) {
    keyDown[keyCode] = false;
};

var isKeyDown = function (keyName) {
    return keyDown[keys[keyName]] == true;
};

window.onkeydown = function (e) {
    setKey(e.keyCode);
};
window.onkeyup = function (e) {
    clearKey(e.keyCode);
};