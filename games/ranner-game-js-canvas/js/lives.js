var livesBar = loadLivesBar('sprites/heartBar.png', 152, 48, 800, 0, 3);
/*var heart = loadBarrier('sprites/box.png', 50, 50, 1000, 402, 1);*/

//жизни
function loadLivesBar(imageSrc, width, height, dx, dy, countOfSprites) {
    var image = document.createElement('img');
    var livesBar = {
        dom: image,
        width: width,
        height: height,
        dx: dx,
        dy: dy,
        countOfSprites: countOfSprites,
        sprLine: 0,
        loseLiveF: function () {
            switch (hero.lives) {
                case 3:
                    this.sprLine = 0;
                    break;
                case 2:
                    this.sprLine = 1;
                    break;
                case 1:
                    this.sprLine = 2;
                    break;
            }
        }
    };
    image.src = imageSrc;
    return livesBar;
}//

function drawLivesBar(livesBar) {
    livesBar.loseLiveF();

    context.drawImage(livesBar.dom, 0, livesBar.height * livesBar.sprLine, livesBar.width, livesBar.height, livesBar.dx, livesBar.dy, livesBar.width/1.5, livesBar.height/1.5);
}