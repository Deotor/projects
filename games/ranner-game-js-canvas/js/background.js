var background1 = loadBackground('sprites/fon.png', 1023, 386, 0, 1);
var background2 = loadBackground('sprites/fon.png', 1023, 386, 1023, 1);

//фон
function loadBackground(imageSrc, width, height, dx, countOfSprites) {
    var image = document.createElement('img');
    var ground = {
        dom: image,
        width: width,
        height: height,
        dx: dx,
        countOfSprites: countOfSprites,
        moveF: function () {
            if(hero.start == 0){
                this.dx -= speed;
            }
        },
        moveToF: function (background2) {
            if (this.dx + this.width < 0) {
                this.dx = background2.dx + background2.width;
            }
        }
    };
    image.src = imageSrc;
    return ground;
}//

function drawBackground(background1, background2) {

    background1.moveF();
    background2.moveF();

    background1.moveToF(background2);
    background2.moveToF(background1);

    context.drawImage(background1.dom, 0, 0, background1.width, background1.height, background1.dx, 0, background1.width, background1.height * 1.17);

    context.drawImage(background2.dom, 0, 0, background2.width, background2.height, background2.dx, 0, background2.width, background2.height * 1.17);
}