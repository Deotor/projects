var wallDestr = loadWallDestr('sprites/wallDestr.png', 125, 400, 2500, 186, 2);

//барьер
function loadWallDestr(imageSrc, width, height, dx, dy, countOfSprites) {
    var image = document.createElement('img');
    var wallDestr = {
        dom: image,
        width: width,
        height: height,
        dx: dx,
        dy: dy,
        dxStart: dx,
        scale: 1.5,
        countOfSprites: countOfSprites,
        numOfCurrentSprite: 0,
        moveF: function () {
            this.dx -= speed * 2;
        },
        moveToF: function () {
            switch (random) {
                case 0:
                    if((this.dx + this.width/this.scale) < 0){
                        this.dx += 3500;
                        this.numOfCurrentSprite = 0;
                        console.log(this.dx);
                    }
                    break;
                case 1:
                    if((this.dx + this.width/this.scale) < 0){
                        this.dx += 2000;
                        this.numOfCurrentSprite = 0;
                        console.log(this.dx);
                    }
                    break;
            }
        },
        destrF: function (hero) {
            if (this.dx < hero.dx + hero.width/hero.scale &&
                this.dx + this.width/this.scale > hero.dx &&
                (this.dy) < hero.dy + hero.height/hero.scale &&
                (this.height/this.scale) + this.dy > hero.dy) {
                if(hero.kick == 0){
                    hero.lives -= 1;
                    console.log('ok');
                } else{
                    this.numOfCurrentSprite = 1;
                }
            }
        }
    };
    image.src = imageSrc;
    return wallDestr;
}//

function drawWallDestr(wallDestr) {

    wallDestr.moveF();

    wallDestr.moveToF();

    wallDestr.destrF(hero);

    context.drawImage(wallDestr.dom, wallDestr.width * (wallDestr.numOfCurrentSprite), 0, wallDestr.width, wallDestr.height, wallDestr.dx, wallDestr.dy, wallDestr.width/wallDestr.scale, wallDestr.height/wallDestr.scale);
}