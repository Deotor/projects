function loadAudio(array, volume) {
    var audio = document.createElement('audio');
    for (var i = 0; i <= array.length; i++){
        var source = document.createElement('source');
        source.src = array[i];
        audio.appendChild(source);
    }
    audio.volume = volume;
    var objAudio = {
        dom: false,
        state: 'stop',
        play: function () {
            this.dom.play();
            this.state = 'play';
        },
        pause: function () {
            this.dom.pause();
            this.state = 'pause';
        },
        stop: function () {
            this.dom.pause();
            this.dom.currentTime = 0;
            this.state = 'stop';
        },
        setVolume: function (volume) {
            this.volume = volume;
        }
    };
    objAudio.dom = audio;
    return objAudio;
}

var jump = loadAudio(['audio/jump.mp3'], 0.2);
var mainMusic = loadAudio(['audio/main.mp3'], 0.1);
var kick = loadAudio(['audio/kick.wav'], 0.2);