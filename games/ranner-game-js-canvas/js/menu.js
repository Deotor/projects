var user;

var infoSlideImg = LoadImage('sprites/slideInfo.png', 258, 234, 100, 20);
var infoJumpImg = LoadImage('sprites/jumpInfo.png', 228, 253, 100, 280);
var infoKickImg = LoadImage('sprites/kickInfo.png', 364, 269, 10, 10);
var infoMegaJump = LoadImage('sprites/megaJumpInfo.png', 607, 272, 10, 295);

function LoadImage(imageSrc, width, height, dx, dy) {
    var image = document.createElement('img');
    var imageElem = {
        dom: image,
        width: width,
        height: height,
        dx: dx,
        dy: dy
    };
    image.src = imageSrc;
    return imageElem;
}

var infoSlideOne = function () {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.font = "italic 20pt Arial";
    context.fillText('нажимай ВНИЗ что бы СКОЛЬЗИТЬ', width / 2.5, height / 6);
    context.drawImage(infoSlideImg.dom, 0, 0, infoSlideImg.width, infoSlideImg.height, infoSlideImg.dx, infoSlideImg.dy, infoSlideImg.width, infoSlideImg.height);
    context.fillText('нажимай ВВЕРХ что бы ПРЫГАТЬ', width / 2.5, height / 1.5);
    context.drawImage(infoJumpImg.dom, 0, 0, infoJumpImg.width, infoJumpImg.height, infoJumpImg.dx, infoJumpImg.dy, infoJumpImg.width, infoJumpImg.height);
    context.fillText('нажми ВПРАВО что бы продолжить', width / 2.5, height / 1.1);
    if (isKeyDown('RIGHT')){
        setGameEngine(infoSlideTwo);
    }
    canvas.style.backgroundColor="#999";
};

var infoSlideTwo = function () {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.font = "italic 20pt Arial";
    context.fillText('нажимай ВПРАВО на стрелке что бы разбить', width / 2.5, height / 6);
    context.drawImage(infoKickImg.dom, 0, 0, infoKickImg.width, infoKickImg.height, infoKickImg.dx, infoKickImg.dy, infoKickImg.width, infoKickImg.height);
    context.fillText('нажимай ВВЕРХ на стрелке', 630, height / 1.5);
    context.drawImage(infoMegaJump.dom, 0, 0, infoMegaJump.width, infoMegaJump.height, infoMegaJump.dx, infoMegaJump.dy, infoMegaJump.width, infoMegaJump.height);
    context.fillText('нажми ВПРАВО что бы продолжить', width / 2.5, height / 3);
    if (isKeyDown('RIGHT') && time > 10){
        createInput();
        setGameEngine(logIn);
    } else time++;
    if (isKeyDown('LEFT')){
        time = 0;
        setGameEngine(infoSlideOne);
    }
    canvas.style.backgroundColor="#999";
};

function createInput() {
    return input = new CanvasInput({
        canvas: document.getElementById('canvas'),
        x: 350,
        y: 250,
        fontSize: 18,
        fontFamily: 'Arial',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        placeHolder: 'Введите ник и нажмите пробел'
    });
}

var logIn = function () {

    context.clearRect(0, 0, width, height);
    drawGround(ground1, ground2);
    drawBackground(background1, background2);
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.font = "italic 20pt Arial";
    context.fillText('Введи НИК и нажми ПРОБЕЛ', width / 3, height / 3);
    input.focus();
    if (isKeyDown('SPACE')){
        user = input.value();
        if(user == ''){
            user = 'User';
        }
        input.destroy();
        setGameEngine(menu);
    }
};

var menu = function () {
    context.clearRect(0, 0, width, height);
    drawGround(ground1, ground2);
    drawBackground(background1, background2);
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.font = "italic 20pt Arial";
    context.fillText('Привет '+ user + ' !', width / 3, height / 3);
    context.fillText('нажми ENTER что бы НАЧАТЬ', width / 3, height / 2.5);
    if (isKeyDown('ENTER')){
        hero.start = 0;
        setGameEngine(gameGO);
    }
};

var gameOver = function () {
    context.clearRect(0, 0, width, height);
    mainMusic.stop();
    drawGround(ground1, ground2);
    drawBackground(background1, background2);
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.font = "italic 20pt Arial";
    context.fillText('Не плохо '+ user + ' !', width / 10, height / 3.8);
    context.fillText('Твой текущий счет ' + hero.distanse + ' м', width / 10, height / 3);
    context.fillText('Рекорд ' + localStorage.getItem('Рекорд') + ' м', width / 10, height / 2.5);
    context.fillText('нажми ENTER что бы НАЧАТЬ ЗАНОВО', width / 10, height / 2);
    if (isKeyDown('ENTER')){
        resetGame();
        setGameEngine(gameGO);
    }
};