function resetGame() {
    hero.lives = 3;
    hero.distanse = 0;
    hero.stay = 0;
    hero.jump = 0;
    hero.megaJump = 0;
    hero.dy = dyNormal;
    wallDestr.dx = wallDestr.dxStart;
    jumpAreaRight.dx = jumpAreaRight.dxStart;
    jumpArea.dx = jumpArea.dxStart;
    bigBarrier.dx = bigBarrier.dxStart;
    speed = 5;

    for(var i = 0; i < arrBarriers.length; i++){
        arrBarriers[i].dx = arrBarriers[i].dxStart;
    }
}