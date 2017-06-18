var bigBarrier = loadBigBarrier('sprites/wall.png', 100, 200, 3500, 253, 1);

arrBarriers.push(bigBarrier);

//барьер
function loadBigBarrier(imageSrc, width, height, dx, dy, countOfSprites) {
    var image = document.createElement('img');
    var bigBarrier = {
        dom: image,
        width: width,
        height: height,
        dx: dx,
        dxStart: dx,
        dy: dy,
        moveF: function () {
            this.dx -= speed * 2;
        },
        moveToF: function () {
            if((this.dx + this.width) < 0){
                this.dx += 3500;
                /*if(random == 0){
                    random = 1;
                    console.log(random);
                } else {
                    random = 0;
                    console.log(random);
                }*/
            }
        },
        countOfSprites: countOfSprites
    };
    image.src = imageSrc;
    return bigBarrier;
}//

function drawBigBarrier(bigBarrier) {

    bigBarrier.moveF();

    bigBarrier.moveToF();

    context.drawImage(bigBarrier.dom, 0, 0, bigBarrier.width, bigBarrier.height, bigBarrier.dx, bigBarrier.dy, bigBarrier.width, bigBarrier.height);
}