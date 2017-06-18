function drawPoints(hero) {
    hero.distanse += 1;
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.font = "italic 25pt Arial";
    context.fillText('Пробежал ' + hero.distanse + ' м', 20, 50);
    if(hero.distanse == 200){
     time = hero.distanse;
     speed += 1;
     }
     if(hero.distanse - time == 200){
     time = hero.distanse;
     speed += 1;
     }
}