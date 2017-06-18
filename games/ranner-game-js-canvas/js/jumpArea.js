var jumpArea = loadJumpArea('sprites/arrowUP.png', 170, 170, 1, 3000, 365);

var jumpAreaRight = loadJumpArea('sprites/arrowRight.png', 170, 170, 1, 2300, 365);

var arrJumpArea = [];
arrJumpArea.push(jumpArea);


//зона прыжка
function loadJumpArea(imageSrc, width, height, countOfSprites, dx, dy) {
    var image = document.createElement('img');
    var arrow = {
        dom: image,
        width: width,
        height: height,
        countOfSprites: countOfSprites,
        dx: dx,
        dxStart: dx,
        dy: dy,
        dinamic: 0,
        step: 0,
        scaleArrow: 2,
        dinamicF: function () {
            if(this.scaleArrow <= 2 && this.dinamic == 0){
                this.dinamic = 1;
            }
            if(this.scaleArrow >= 2.1){
                this.dinamic = 0;
            }
            if(this.dinamic == 1 && this.scaleArrow < 2.1){
                if(this.step == 1){
                    this.scaleArrow += 0.01;
                    this.step = 0;
                } else{
                    this.step++;
                }
            } else {
                if(this.step == 1){
                    this.scaleArrow -= 0.01;
                    this.step = 0;
                } else{
                    this.step++;
                }
            }
        },
        moveF: function () {
            this.dx -= speed * 2;
        },
        moveToF: function () {
            if((this.dx + this.width/this.scaleArrow) < 0){
                this.dx += 3500;
            }
        }
};
    image.src = imageSrc;

    return arrow;
}//

function drawJumpArea(jumpArea) {

    jumpArea.dinamicF();

    jumpArea.moveF();

    jumpArea.moveToF();

    context.globalAlpha = 0.7;

    context.drawImage(jumpArea.dom, 0, 0, jumpArea.width, jumpArea.height, jumpArea.dx, jumpArea.dy, jumpArea.width/jumpArea.scaleArrow, jumpArea.height/jumpArea.scaleArrow);
}

function drawJumpAreaRight(jumpAreaRight) {

    jumpAreaRight.dinamicF();

    jumpAreaRight.moveF();

    jumpAreaRight.moveToF();

    context.globalAlpha = 0.7;

    context.drawImage(jumpAreaRight.dom, 0, 0, jumpAreaRight.width, jumpAreaRight.height, jumpAreaRight.dx, jumpAreaRight.dy, jumpAreaRight.width/jumpAreaRight.scaleArrow, jumpAreaRight.height/jumpAreaRight.scaleArrow);
}