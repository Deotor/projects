var ground1 = loadGround('sprites/ground.png', 1024, 146, 0, 450, 1);
var ground2 = loadGround('sprites/ground.png', 1024, 146, 1024, 450, 1);

var arrGround = [];
arrGround.push(ground1);
arrGround.push(ground2);

//земля
function loadGround(imageSrc, width, height, dx, dy, countOfSprites) {
    var image = document.createElement('img');
    var ground = {
        dom: image,
        width: width,
        height: height,
        dx: dx,
        dy: dy,
        countOfSprites: countOfSprites,
        moveF: function () {
            if(hero.start == 0){
                this.dx -= speed * 2;
            }
        },
        moveToF: function (ground2) {
            if (this.dx + this.width < 0) {
                this.dx = ground2.dx + ground2.width;
            }
        }
    };
    image.src = imageSrc;
    return ground;
}//

function drawGround(ground1, ground2) {

    ground1.moveF();
    ground2.moveF();

    ground1.moveToF(ground2);
    ground2.moveToF(ground1);


    context.drawImage(ground1.dom, 0, 0, ground1.width, ground1.height, ground1.dx, ground1.dy, ground1.width, ground1.height);

    context.drawImage(ground2.dom, 0, 0, ground2.width, ground2.height, ground2.dx, ground1.dy, ground2.width, ground2.height);
}