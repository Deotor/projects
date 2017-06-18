dyNormal = 362;

var hero = LoadHero('sprites/hero.png', 363, 458, 12, 100, 362, dyNormal);

//главный герой
function LoadHero(imageSrc, width, height, countOfSprites, dx, dy, dyNormal) {
    var image = document.createElement('img');
    var hero = {
        dom: image,
        scale: 5,
        width: width,
        height: height,
        countOfSprites: countOfSprites,
        numOfCurrentSprite: 0,
        dx: dx,
        dxNormal: 100,
        dy: dy,
        dyNormal: dyNormal,
        jump: 0,
        megaJump: 0,
        stay: 1,
        slide: 0,
        slideDist: 0,
        step: 0,
        slideH: 0,
        sprLine: 0,
        distanse: 0,
        lives: 3,
        loseLivesTime: 0,
        start: 1,
        kick: 0,
        kickDist: 0,
        slideF: function () {
            if(isKeyDown('DOWN') && this.slide == 0 && this.stay == 1){
                this.numOfCurrentSprite = 10;
                this.slide = 1;
                this.stay = 0;
                this.slideH = 20;
            }
            if(this.slide == 1){
                this.slideDist += 1;
                if(this.slideDist >= 150/speed){
                    this.slide = 0;
                    this.stay = 1;
                    this.slideDist = 0;
                    this.slideH = 0;
                }
            }
        },
        jumpF: function () {
            if (isKeyDown('UP') && this.jump == 0 && this.slide == 0 && this.kick == 0 && this.megaJump == 0 && this.stay == 1){
                jump.play();
                this.numOfCurrentSprite = 11;
                this.jump = 1;
                this.stay = 0;
            }
            if(this.dy > 250 && this.jump == 1){
                this.dy -= speed;
            } else if(this.dy != this.dyNormal && this.jump == 1){
                if(this.dy != this.dyNormal){
                    this.jump = 0;
                }
            }
            if (this.dy == this.dyNormal && this.slide == 0 && this.megaJump == 0 && this.kick == 0){
                this.stay = 1;
            }
        },
        megaJumpF: function (jumpArea) {
            if (isKeyDown('UP') && this.stay == 1 &&
                this.dx < jumpArea.dx + jumpArea.width &&
                this.dx + this.width/this.scale > jumpArea.dx &&
                this.dy < jumpArea.dy + jumpArea.height &&
                (this.height/this.scale) + this.dy > jumpArea.dy) {
                jump.play();
                this.megaJump = 1;
                this.numOfCurrentSprite = 11;
                this.stay = 0;
            }
            if(this.dy > 100 && this.megaJump == 1){
                this.dy -= speed;
            } else if(this.dy != this.dyNormal && this.megaJump == 1){
                this.megaJump = 0;
            }
            if (this.dy == this.dyNormal && this.slide == 0 && this.kick == 0){
                this.stay = 1;
            }
        },
        chengeSprites: function () {
            if(this.stay == 1){
                if(this.step == 10){
                    this.step = 0;
                    this.numOfCurrentSprite += 1;
                } else {
                    this.step += 1;
                }
            }
            if (this.numOfCurrentSprite >= this.countOfSprites - 2 && this.stay == 1){
                this.numOfCurrentSprite = 0;
            }
        },
        isCollision: function (arrBarriers) {
            for(var i = 0; i < arrBarriers.length; i++){
                if (this.dx < arrBarriers[i].dx + arrBarriers[i].width &&
                    this.dx + this.width/this.scale - 10 > arrBarriers[i].dx &&
                    (this.dy + this.slideH) < arrBarriers[i].dy + arrBarriers[i].height &&
                    (this.height/this.scale - 15) + this.dy > arrBarriers[i].dy) {
                    if(this.loseLivesTime == 0){
                        this.lives -= 1;
                        this.loseLivesTime = 20;
                    }
                    if(this.distanse > localStorage.getItem('Рекорд')){
                        localStorage.setItem('Рекорд', this.distanse);
                    }
                }
            }
        },
        loseLivesTimeF: function () {
            if(this.loseLivesTime > 0){
                this.loseLivesTime -= 1;
            }
        },
        gravitation: function (arrGround) {
            for(var i = 0; i < arrGround.length; i++){
                if (this.dx < arrGround[i].dx + arrGround[i].width &&
                    this.dx + Math.floor(this.width/this.scale) > arrGround[i].dx &&
                    this.dy < arrGround[i].dy + arrGround[i].height &&
                    Math.floor(this.height/this.scale) + this.dy > arrGround[i].dy) {
                }
                if (this.jump == 0 && this.megaJump == 0 && this.stay == 0 && this.slide == 0){
                    if(this.dy != Math.floor(arrGround[i].dy - this.height/this.scale + 4)){
                        this.dy += speed/2;
                        if(this.dy > Math.floor(arrGround[i].dy - this.height/this.scale + 4)){
                            this.dy = Math.floor(arrGround[i].dy - this.height/this.scale + 4);
                            this.dyNormal = Math.floor(arrGround[i].dy - this.height/this.scale + 4);
                        }
                    }
                }
            }
        },
        kickF: function (jumpAreaRight) {
            if (isKeyDown('RIGHT') && this.stay == 1 &&
                this.dx < jumpAreaRight.dx + jumpAreaRight.width &&
                this.dx + this.width/this.scale > jumpAreaRight.dx &&
                this.dy < jumpAreaRight.dy + jumpAreaRight.height &&
                (this.height/this.scale) + this.dy > jumpAreaRight.dy) {
                kick.play();
                this.kick = 1;
                this.numOfCurrentSprite = 11;
                this.stay = 0;
            }
            if(this.kick == 1){
                this.kickDist += 1;
                this.dx += 2;

                if(this.kickDist >= 150/speed){
                    this.kick = 0;
                    this.stay = 1;
                    this.kickDist = 0;
                }
            }
            if(this.dx != this.dxNormal && this.kick == 0){
                this.dx -= 2;
            }
        }
    };
    image.src = imageSrc;
    return hero;
}//

//движок
function drawHero(hero) {

    hero.loseLivesTimeF();

    hero.gravitation(arrGround);

    hero.chengeSprites();

    hero.megaJumpF(jumpArea);

    hero.jumpF();

    hero.slideF();

    hero.kickF(jumpAreaRight);

    hero.isCollision(arrBarriers);

    context.drawImage(hero.dom, hero.width * (hero.numOfCurrentSprite), (hero.height * hero.sprLine), hero.width, hero.height, hero.dx, hero.dy, Math.floor(hero.width/hero.scale), Math.floor(hero.height/hero.scale));
}

/*var time;
var now = new Date().getTime(),
 dt = now - (time || now);
 if (dt > 1000){
 time = now;
 }
 console.log(dt);*/

/*
// Сохраняем настройки канваса до всяких манипуляций с ним
ctx.save();

// Сдвигаем все адресованные пиксели на указанные значения
ctx.translate(canvas.width/2,canvas.height/2);

// Поворачиваем на `degrees` наш градус
ctx.rotate(degrees*Math.PI/180);

// Рисуем повернутую картинку
ctx.drawImage(image,-image.width/2,-image.width/2);

// Восстанавливаем настройки на момент когда делали `ctx.save`
// то бишь до `ctx.translate` и `ctx.rotate`. Рисунок при этом сохраняется.
ctx.restore();*/
