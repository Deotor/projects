function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 41.85, lng: -87.65},
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'customMapStyleRed']
        }
    });
//обработчик клика по карте
    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
    });
//
    setMapOnAll(map);


    map.mapTypes.set('customMapStyleRed', customMapStyleRed());

    map.setMapTypeId('roadmap');
//панель управления
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map, {lat: 41.85, lng: -87.65});
    var currentPosition = new CurrentPosition(centerControlDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
//
}