var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var gameEngine, width = 1000, height = 550, speed = 5, fps = 60, random = 0, time = 0;
canvas.width = width;
canvas.height = height;

var gameEngineStart = function (callback) {
    gameEngine = callback;
    gameEngineStep();
};
var gameEngineStep = function () {
    gameEngine();
    nextGameStep(gameEngineStep);
};
var setGameEngine = function (callback) {
    gameEngine = callback;
};
var nextGameStep = (function () {
    return function (callback) {
        setTimeout(function() {
            requestAnimationFrame(callback)||
            webkitRequestAnimationFrame(callback)||
            mozRequestAnimationFrame(callback)||
            oRequestAnimationFrame(callback)||
            msRequestAnimationFrame(callback)
        }, 1000 / fps);
    };
})();

var gameGO = function () {
    mainMusic.play();
    drawGround(ground1, ground2);
    drawBackground(background1, background2);
    drawBarrier(barrier1, barrier2, barrier3);
    drawBigBarrier(bigBarrier);
    drawPoints(hero);
    drawHero(hero);
    drawWallDestr(wallDestr);
    drawJumpArea(jumpArea);
    drawJumpAreaRight(jumpAreaRight);
    drawLivesBar(livesBar);
    context.globalAlpha = 1;
    if(hero.lives == 0){
        setGameEngine(gameOver);
    }
};

gameEngineStart(infoSlideOne);