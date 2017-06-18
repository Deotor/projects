get_location();

$(document).ready(function(){
    var placeToInsert = $('body');
    $('<div/>', {
        'id': 'log',
        'style': 'border-top: solid 1px black',
        'width': '300px'
    }).appendTo(placeToInsert);
});

function get_location() {
    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap, handleError);
    } else {
        $('#log').html('Geolocation is not supported!');
    }
}

function showMap(position) {
    var openWeatherAppId = '044cce2abb1f9be0fb4f4cff5792a27f',
        openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily',
        latitude = position.coords.latitude,
        longitude = position.coords.longitude;
        getData(openWeatherUrl, latitude, longitude, openWeatherAppId);
}

function handleError(err) {
    if (err.code == 1) {
        $('#log').html('Allow access to geolocation!');
    }
}

function getData (url, latitude, longitude, appId) {
    var request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {lat: latitude, lon: longitude, appid: appId, units: 'metric', cnt:3},
        jsonpCallback: "handlerForecast",
        type: "GET"
    }).fail(function(error){
        console.error(error);
    })
}

function handlerForecast (forecast) {
    console.log(forecast);
    var html = '';
    html += '<h4>Прогноз погоды в ' + forecast.city.name + ', ' + forecast.city.country + '</h4>';
    forecast.list.forEach(function(forecast, index){
        var src = 'http://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png';
        html += '<div style="border-bottom: solid 1px black; padding: 5px 0"><p style="margin: 0">' + date(index) + ': ' + '</p>' +
                '<img src=' + src + '>' + '<p style="margin: 0">' + 'день: ' + parseInt(forecast.temp.day) + ' C&#176;, '+ 'ночь: ' + parseInt(forecast.temp.night) + ' C&#176;'+ '</p></div>'
});
    $('#log').html(html)
}

function date(index) {
    var now = new Date(), month, day;
    if(now.getMonth() < 10) month = '0' + (now.getMonth() + 1);
    else month = (now.getMonth() + 1);
    if(now.getDate() < 10) day = '0' + (now.getDate() + index);
    else day = (now.getDate() + index);
    return day + '.' + month + '.' + now.getFullYear();
}