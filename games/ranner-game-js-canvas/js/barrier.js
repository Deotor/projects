var barrier1 = loadBarrier('sprites/box.png', 50, 50, 1000, 325, 1);
var barrier2 = loadBarrier('sprites/box.png', 50, 50, 1500, 402, 1);
var barrier3 = loadBarrier('sprites/box.png', 50, 50, 2000, 325, 1);
var arrBarriers = [];
arrBarriers.push(barrier1);
arrBarriers.push(barrier2);
arrBarriers.push(barrier3);

//барьер
function loadBarrier(imageSrc, width, height, dx, dy, countOfSprites) {
    var image = document.createElement('img');
    var ground = {
        dom: image,
        width: width,
        height: height,
        dx: dx,
        dy: dy,
        dxStart: dx,
        countOfSprites: countOfSprites,
        moveF: function () {
            this.dx -= speed * 2;
        },
        moveToF: function () {
            switch (random) {
                case 0:
                    if(this.dx + this.width < 0){
                        this.dx += 3500;
                    }
                    break;
                case 1:
                    if(this.dx + this.width < 0){
                        this.dx += 4000;
                        this.numOfCurrentSprite = 0;
                    }
                    break;
            }
        }
    };
    image.src = imageSrc;
    return ground;
}//

function drawBarrier(barrier1, barrier2, barrier3) {
    barrier1.moveF();
    barrier2.moveF();
    barrier3.moveF();

    barrier1.moveToF();
    barrier2.moveToF();
    barrier3.moveToF();





    context.drawImage(barrier1.dom, 0, 0, barrier1.width, barrier1.height, barrier1.dx, barrier1.dy, barrier1.width, barrier1.height);

    context.drawImage(barrier2.dom, 0, 0, barrier2.width, barrier2.height, barrier2.dx, barrier2.dy, barrier2.width, barrier2.height);

    context.drawImage(barrier3.dom, 0, 0, barrier3.width, barrier3.height, barrier3.dx, barrier3.dy, barrier3.width, barrier3.height);
}