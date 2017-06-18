function buildArea() {
    var row = $('#row').val();
    var col = $('#col').val();
    var square = row * col;
    var gameArea = $('#game-area');
    var width = row * 40;
    $('main').width(width);
    gameArea.html('');
        for (var i = 1; i <= square; i++){
            gameArea.append('<div class="game-area-div"></div>');
    }
    if (row > 10 || col > 10 || row <=0 || col <= 0){
        alert("количество строк и столбцов должно быть в пределах 10");
        gameArea.html('');
        $('#start').fadeOut(0);
    }
    else {
        $('#start').fadeIn(0);
    }
}
function startGame() {
    var dif = $('#dif').val();
    var difTime = 1000-(dif-1)*200;
    var randomGame = $('.game-area-div');
    var timeForGame = difTime * (randomGame.length+1);
    console.log(timeForGame);
    randomazer(randomGame);
    var i = 0;
    $('#build').attr('disabled', 'disabled');
    $('#start').attr('disabled', 'disabled');
    setInterval(function() {
        $(randomGame[i]).addClass('game-area-div-red');
        i +=1;
    }, difTime);
    randomGame.on('click', function () {
        if ($(this).hasClass('game-area-div-red')) {
            $(this).removeClass('game-area-div-red').addClass('game-area-div-blue');
        }
    });
    setTimeout(function () {
        if (randomGame.hasClass('game-area-div-red')){
            $('#game-result').text('Script WIN').css('color', 'red');
            randomGame.unbind('click');
            $('#reset').fadeIn(0);
        }
        else {
            $('#game-result').text('User WIN').css('color', 'blue');
            $('#reset').fadeIn(0);
        }
    }, timeForGame);
// функция перетосовки
    function randomazer(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}
function reset() {
    var gameArea = $('#game-area');
    $('#build').removeAttr('disabled');
    $('#start').removeAttr('disabled');
    $('#reset').fadeOut(0);
    $('#start').fadeOut(0);
    gameArea.html('');
    $('#game-result').text('Результат').css('color', 'black');
}
$('#reset').fadeOut(0);
$('#start').fadeOut(0);